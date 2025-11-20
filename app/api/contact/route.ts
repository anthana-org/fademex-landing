import { NextResponse } from 'next/server'
import { sendUserConfirmation, sendAdminNotification } from '@/lib/email'

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

    // Send emails
    try {
      // Send confirmation to user
      await sendUserConfirmation(body)

      // Send notification to admin
      await sendAdminNotification(body)
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      return NextResponse.json(
        { error: 'Error al enviar los correos. Por favor intenta de nuevo.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Solicitud enviada correctamente. Revisa tu correo para la confirmación.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
