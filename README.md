# FADEMEX Landing Page

A modern, glassmorphism-styled landing page for FADEMEX - Solar Energy Consulting for businesses in Mexico.

## Features

- Modern glassmorphism UI design
- Responsive layout
- Interactive map with project locations
- Contact form with email notifications
- Vercel-ready deployment

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Maps**: Leaflet
- **Email**: Resend
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fademex-landing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your environment variables:
   - Get your Resend API key from [https://resend.com](https://resend.com)
   - Set up your admin email address
   - Configure the sender email (must be verified in Resend)

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Email Configuration

This project uses [Resend](https://resend.com) for sending emails. To set it up:

1. Create a free account at [https://resend.com](https://resend.com)
2. Generate an API key from the dashboard
3. For production, verify your domain to send from your own email address
4. For testing, you can use `onboarding@resend.dev` as the sender

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Your Resend API key | Yes |
| `EMAIL_FROM` | Sender email address | Yes |
| `ADMIN_EMAIL` | Admin email for notifications | Yes |

## Deployment to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard.

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Import the project in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables
4. Deploy

### Environment Variables in Vercel

In your Vercel project settings, add:

- `RESEND_API_KEY`: Your Resend API key
- `EMAIL_FROM`: Sender email (e.g., `FADEMEX <noreply@yourdomain.com>`)
- `ADMIN_EMAIL`: Admin notification email

## API Endpoints

### POST `/api/contact`

Handles contact form submissions and sends confirmation emails.

**Request Body:**
```json
{
  "nombre": "string",
  "empresa": "string",
  "telefono": "string",
  "email": "string",
  "mensaje": "string"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Solicitud enviada correctamente."
}
```

**Response (Error):**
```json
{
  "error": "Error message"
}
```

## Project Structure

```
fademex-landing/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts    # Contact form API
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── ContactForm.tsx     # Contact form component
│   └── Map.tsx             # Leaflet map component
├── lib/
│   └── email.ts            # Email templates & sending
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## License

© 2025 FADEMEX Labs. All rights reserved.
