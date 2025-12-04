# Contact Form Integration with Supabase Leads

This document shows how to integrate your existing contact form to automatically save submissions to the Supabase `leads` table.

## Option 1: Update the API Route (Recommended)

Update your existing `/app/api/contact/route.ts` to also save to Supabase:

```typescript
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, phone, company, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 1. Save to Supabase leads table
    const supabase = await createClient()
    const { error: leadError } = await supabase
      .from('leads')
      .insert([
        {
          full_name: name,
          email: email,
          phone: phone || null,
          company_name: company || null,
          status: 'New',
          contacted: false,
        },
      ])

    if (leadError) {
      console.error('Error saving lead to Supabase:', leadError)
      // Continue with email sending even if lead save fails
    }

    // 2. Send confirmation email to user (existing functionality)
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Thank you for contacting FADEMEX',
      html: `
        <h1>Thank you for your interest, ${name}!</h1>
        <p>We've received your message and will get back to you soon.</p>
        <p>Your message:</p>
        <blockquote>${message}</blockquote>
      `,
    })

    // 3. Send notification to admin (existing functionality)
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    )
  }
}
```

## Option 2: Use Server Action

Alternatively, update your `ContactForm.tsx` to use a Server Action:

```typescript
'use client'

import { useState } from 'react'
import { createLead } from '@/lib/actions/leads'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Save to Supabase
      await createLead({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company_name: formData.company || undefined,
      })

      // Also send email via existing API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  // ... rest of your form component
}
```

## Option 3: Add Public Registration Endpoint

Create a new public API endpoint specifically for lead registration:

**File**: `/app/api/leads/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { full_name, email, phone, company_name } = await request.json()

    // Validate required fields
    if (!full_name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to Supabase (RLS policy allows public INSERT)
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          full_name,
          email,
          phone: phone || null,
          company_name: company_name || null,
          status: 'New',
          contacted: false,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating lead:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, lead: data })
  } catch (error) {
    console.error('Error processing lead registration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

Then call this from your form:

```typescript
const response = await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    full_name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company_name: formData.company,
  }),
})
```

## Best Practice: Both Email and Database

The recommended approach is to do BOTH:

1. **Save to Supabase** for CRM tracking and management
2. **Send email notifications** for immediate awareness

This gives you:
- ✅ Centralized lead database
- ✅ Immediate email notifications
- ✅ Long-term tracking and analytics
- ✅ Backup if one system fails

## Testing the Integration

1. Go to your contact page
2. Fill out and submit the form
3. Check:
   - Email inbox (admin and user)
   - Supabase dashboard → Table Editor → leads
   - Admin dashboard at `/admin`

## Troubleshooting

### Leads not appearing in Supabase
- Check browser console for errors
- Verify RLS policy allows public INSERT
- Test by manually inserting a lead in Supabase SQL Editor

### Email not sending but lead is saved
- Check Resend API key
- Verify email addresses are correct
- Check API logs in Resend dashboard

### Both failing
- Check API route is correctly implemented
- Verify environment variables are set
- Check server logs for errors

---

Choose the option that best fits your current architecture!
