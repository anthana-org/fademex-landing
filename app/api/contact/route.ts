import { NextResponse } from 'next/server'
import { sendUserConfirmation, sendAdminNotification } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

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
    try {
      // Send confirmation to user
      await sendUserConfirmation(body)

      // Send notification to admin
      await sendAdminNotification(body)

      emailsSent = true
      console.log('Emails sent successfully')
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request - the lead data is already saved
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
