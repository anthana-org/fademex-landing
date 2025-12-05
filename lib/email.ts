import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactData {
  nombre: string
  empresa: string
  telefono: string
  email: string
  mensaje: string
}

// Email template for user confirmation
function getUserConfirmationHtml(data: ContactData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Solicitud - FADEMEX</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #111111; border-radius: 16px; overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    <span style="color: #FFD700;">●</span> FADEMEX
                  </h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px;">
                    ¡Hola ${data.nombre}!
                  </h2>

                  <p style="margin: 0 0 20px; color: #9ca3af; font-size: 16px; line-height: 1.6;">
                    Hemos recibido tu solicitud de cotización. Nuestro equipo de ingenieros está revisando tu información y te contactaremos en las próximas 24-48 horas.
                  </p>

                  <div style="background-color: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h3 style="margin: 0 0 15px; color: #FFD700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Resumen de tu solicitud
                    </h3>
                    <table style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Empresa:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">${data.empresa}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Teléfono:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">${data.telefono}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">${data.email}</td>
                      </tr>
                    </table>
                  </div>

                  <p style="margin: 20px 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">
                    <strong style="color: #ffffff;">Tu mensaje:</strong><br>
                    ${data.mensaje}
                  </p>

                  <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px;">
                    Si tienes alguna pregunta urgente, no dudes en contactarnos.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: rgba(0, 0, 0, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.1);">
                  <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                    © 2025 FADEMEX Labs. Ingeniería Energética de Próxima Generación.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// Email template for admin notification
function getAdminNotificationHtml(data: ContactData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nueva Solicitud de Cotización - FADEMEX</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #111111; border-radius: 16px; overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    <span style="color: #FFD700;">●</span> FADEMEX
                  </h1>
                  <p style="margin: 10px 0 0; color: #FFD700; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                    Nueva Solicitud de Cotización
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <div style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 25px; margin-bottom: 20px;">
                    <h3 style="margin: 0 0 20px; color: #ffffff; font-size: 18px;">
                      Datos del Cliente
                    </h3>
                    <table style="width: 100%;">
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px;">Nombre:</td>
                        <td style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: bold;">${data.nombre}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Empresa:</td>
                        <td style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: bold;">${data.empresa}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Teléfono:</td>
                        <td style="padding: 10px 0;">
                          <a href="tel:${data.telefono}" style="color: #FFD700; font-size: 14px; text-decoration: none;">${data.telefono}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Email:</td>
                        <td style="padding: 10px 0;">
                          <a href="mailto:${data.email}" style="color: #FFD700; font-size: 14px; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div style="background-color: rgba(255, 215, 0, 0.05); border: 1px solid rgba(255, 215, 0, 0.2); border-radius: 12px; padding: 25px;">
                    <h3 style="margin: 0 0 15px; color: #FFD700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Mensaje del Cliente
                    </h3>
                    <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                      ${data.mensaje}
                    </p>
                  </div>

                  <div style="margin-top: 30px; text-align: center;">
                    <a href="mailto:${data.email}?subject=Re: Solicitud de Cotización FADEMEX"
                       style="display: inline-block; background-color: #FFD700; color: #000000; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
                      Responder al Cliente
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: rgba(0, 0, 0, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.1);">
                  <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                    Solicitud recibida el ${new Date().toLocaleString('es-MX', {
                      timeZone: 'America/Mexico_City',
                      dateStyle: 'full',
                      timeStyle: 'short'
                    })}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

export async function sendUserConfirmation(data: ContactData) {
  const fromEmail = process.env.EMAIL_FROM || 'FADEMEX <noreply@fademex.com>'

  console.log('[Email] Sending user confirmation:', {
    from: fromEmail,
    to: data.email,
    subject: '¡Solicitud Recibida! - FADEMEX Energía Solar',
  })

  const { data: result, error } = await resend.emails.send({
    from: fromEmail,
    to: data.email,
    subject: '¡Solicitud Recibida! - FADEMEX Energía Solar',
    html: getUserConfirmationHtml(data),
  })

  if (error) {
    console.error('[Email] User confirmation failed:', error)
    throw new Error(`Failed to send user confirmation: ${error.message}`)
  }

  console.log('[Email] User confirmation sent successfully:', result)
  return result
}

export async function sendAdminNotification(data: ContactData) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@fademex.com'
  const fromEmail = process.env.EMAIL_FROM || 'FADEMEX <noreply@fademex.com>'

  console.log('[Email] Sending admin notification:', {
    from: fromEmail,
    to: adminEmail,
    subject: `Nueva Solicitud: ${data.empresa} - ${data.nombre}`,
  })

  const { data: result, error } = await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject: `Nueva Solicitud: ${data.empresa} - ${data.nombre}`,
    html: getAdminNotificationHtml(data),
  })

  if (error) {
    console.error('[Email] Admin notification failed:', error)
    throw new Error(`Failed to send admin notification: ${error.message}`)
  }

  console.log('[Email] Admin notification sent successfully:', result)
  return result
}
