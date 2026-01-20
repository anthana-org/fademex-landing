import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getUserConfirmationHtml, getAdminNotificationHtml } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

// Initialize Resend client lazily to avoid build-time errors
const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set - emails will not be sent')
    return null
  }
  return new Resend(process.env.RESEND_API_KEY)
}

interface ContactRequest {
  nombre: string
  empresa: string
  telefono: string
  email: string
  mensaje: string
}

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json()

    // Validate required fields
    const { nombre, empresa, telefono, email, mensaje } = body

    if (!nombre || !empresa || !telefono || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del correo electrónico no es válido' },
        { status: 400 }
      )
    }

    // PRIORITY 1: Save to Supabase FIRST (most important - preserve the lead data)
    let leadSaved = false
    try {
      const supabase = await createClient()
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([
          {
            full_name: nombre,
            email: email,
            phone: telefono,
            company_name: empresa,
            admin_notes: `Mensaje: ${mensaje}`,
            status: 'New',
            contacted: false,
          },
        ])

      if (supabaseError) {
        console.error('Supabase save error:', supabaseError)
        // Don't fail the request, continue to try sending emails
      } else {
        leadSaved = true
        console.log('Lead saved to Supabase successfully')
      }
    } catch (supabaseError) {
      console.error('Supabase connection error:', supabaseError)
      // Don't fail the request, continue to try sending emails
    }

    // PRIORITY 2: Send emails (non-critical - if this fails, data is still saved)
    let emailsSent = false
    const resend = getResendClient()

    if (resend) {
      // Send user confirmation
      const { data: userData, error: userError } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: '¡Solicitud Recibida! - FADEMEX Energía Solar',
        html: getUserConfirmationHtml(body),
      })

      if (userError) {
        console.error('[Resend] User confirmation error:', userError)
      } else {
        console.log('[Resend] User confirmation sent:', userData)
      }

      // Send admin notification
      const { data: adminData, error: adminError } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Acme <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL || 'admin@fademex.com'],
        subject: `Nueva Solicitud: ${empresa} - ${nombre}`,
        html: getAdminNotificationHtml(body),
      })

      if (adminError) {
        console.error('[Resend] Admin notification error:', adminError)
      } else {
        console.log('[Resend] Admin notification sent:', adminData)
      }

      // Mark as sent if both succeeded
      emailsSent = !userError && !adminError
    } else {
      console.log('[Resend] Skipping email sending - RESEND_API_KEY not configured')
    }

    // Return success if either operation succeeded
    if (leadSaved || emailsSent) {
      return NextResponse.json(
        {
          success: true,
          message: emailsSent
            ? 'Solicitud enviada correctamente. Revisa tu correo para la confirmación.'
            : 'Solicitud recibida correctamente. Te contactaremos pronto.',
          leadSaved,
          emailsSent,
        },
        { status: 200 }
      )
    } else {
      // Both operations failed
      return NextResponse.json(
        { error: 'Error al procesar la solicitud. Por favor intenta de nuevo.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
