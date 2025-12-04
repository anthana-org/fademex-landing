# Contact Form Integration with Supabase Leads

✅ **IMPLEMENTED** - The contact form now automatically saves all submissions to Supabase.

## Current Implementation

The contact form at `/app/api/contact/route.ts` has been updated to:

1. **Save to Supabase FIRST** (Priority 1 - preserves lead data even if email fails)
2. **Send emails** (Priority 2 - notification, but not critical)
3. **Return success** if either operation succeeds

### Key Features

✅ **Resilient**: Lead data is saved even if email service is down
✅ **Dual notification**: Sends confirmation to user + notification to admin
✅ **Graceful degradation**: Works even if Supabase isn't configured
✅ **Error tracking**: Logs failures without breaking the user experience

### Implementation Details

```typescript
// PRIORITY 1: Save to Supabase FIRST
let leadSaved = false
try {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').insert([{
    full_name: nombre,
    email: email,
    phone: telefono,
    company_name: empresa,
    admin_notes: `Mensaje: ${mensaje}`,
    status: 'New',
    contacted: false,
  }])

  if (!error) leadSaved = true
} catch (error) {
  console.error('Supabase error:', error)
  // Continue anyway - try to send emails
}

// PRIORITY 2: Send emails
let emailsSent = false
try {
  await sendUserConfirmation(body)
  await sendAdminNotification(body)
  emailsSent = true
} catch (error) {
  console.error('Email error:', error)
  // Don't fail - data is already saved
}

// Success if EITHER operation succeeded
return leadSaved || emailsSent ? success : error
```

### Benefits

1. **No data loss**: Even if Resend is down, leads are captured in Supabase
2. **Admin visibility**: All leads appear in admin dashboard immediately
3. **Backup notification**: If emails fail, admin can still check dashboard
4. **User experience**: User always gets a success message if data was saved

## Alternative Implementations

### Option 1: Direct Server Action (Not recommended - use API route)

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

### Option 2: Separate Public Registration Endpoint (Advanced)

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

## ✅ Current Implementation Benefits

The implemented approach (Supabase first, then emails) gives you:

1. **Data Preservation**: Lead data saved even if email fails
2. **Centralized CRM**: All leads in Supabase database
3. **Immediate Notifications**: Email sent when service is available
4. **Long-term Tracking**: Analytics and management via admin dashboard
5. **Resilience**: System works even if one service fails

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
