# FADEMEX Admin Panel Setup Guide

This guide will walk you through setting up the Admin Panel / CRM for managing client leads.

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is fine)
- Access to your project's environment variables

## 🚀 Step-by-Step Setup

### 1. Install Dependencies

First, install the required Supabase packages:

```bash
npm install @supabase/ssr @supabase/supabase-js date-fns
```

### 2. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name**: FADEMEX CRM
   - **Database Password**: Z-EiKi4Z%?#6Pp&!
   - **Region**: Choose the closest to your users
4. Wait for the project to be created (takes ~2 minutes)

### 3. Set Up the Database

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy the entire contents of `supabase-setup.sql` in your project root
4. **IMPORTANT**: Before running, update the admin email addresses in the policies:
   ```sql
   -- Find this section and update with your actual admin emails
   auth.jwt() ->> 'email' IN (
       'admin@fademex.com',
       'juanjo@anthana.com'
       -- Add more admin emails here
   )
   ```
5. Click **Run** to execute the SQL
6. You should see "Success. No rows returned" - this is correct!

### 4. Configure Environment Variables

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env.local` file in your project root (if it doesn't exist)
4. Add these variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Change to your production URL when deploying

# Existing Resend configuration (keep these if you have them)
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@fademex.com
ADMIN_EMAIL=admin@fademex.com
```

### 5. Set Up Authentication

#### Enable Email/Password Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Email** and ensure it's enabled
3. Configure email settings:
   - **Enable email confirmations**: OFF (for easier testing)
   - You can enable this later for production

#### Create Your Admin User

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create New User**
3. Enter your admin email and password
4. **IMPORTANT**: Make sure this email matches one of the emails you added to the RLS policies in step 3!

### 6. Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to [http://localhost:3000/login](http://localhost:3000/login)

3. Sign in with the admin credentials you created

4. You should be redirected to [http://localhost:3000/admin](http://localhost:3000/admin)

### 7. (Optional) Add Test Data

To test the admin panel, you can add some test leads:

1. Go to **SQL Editor** in Supabase
2. Run this query:

```sql
INSERT INTO public.leads (full_name, email, phone, company_name, status, contacted)
VALUES
  ('John Doe', 'john@example.com', '+1234567890', 'Acme Corp', 'New', false),
  ('Jane Smith', 'jane@example.com', '+0987654321', 'Tech Solutions', 'In Progress', true),
  ('Bob Johnson', 'bob@example.com', NULL, NULL, 'New', false);
```

3. Refresh your admin dashboard to see the test leads

## 🎨 Features Overview

### Admin Dashboard (`/admin`)

- **Stats Cards**: Overview of total leads, pending contacts, and new registrations
- **Leads Table**: Sortable, filterable table with all client information
- **Status Management**: Update lead status directly from the table
- **Contact Tracking**: Toggle contacted status with a switch
- **Lead Details**: Click "View" to see full details and add admin notes

### Authentication

- **Protected Routes**: `/admin` routes require authentication
- **Middleware**: Automatically redirects unauthorized users to login
- **Session Management**: Secure cookie-based sessions via Supabase

### Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **Admin-Only Access**: Only whitelisted emails can access admin features
- **Public Registration**: Anyone can submit a lead form (public insert only)

## 📝 Customization

### Adding More Admin Users

1. Go to Supabase SQL Editor
2. Run this to update the policies:

```sql
-- Update all 4 policies (SELECT, UPDATE, DELETE in leads table)
-- Find the email check and add your new admin email:
auth.jwt() ->> 'email' IN (
    'admin@fademex.com',
    'juanjo@anthana.com',
    'newemail@example.com'  -- Add here
)
```

3. Or edit the policies in: **Authentication** → **Policies**

### Customizing the Design

The admin panel uses your existing design system:
- Background: `#050505`
- Primary accent: `#FFD700` (gold)
- Glass effect panels
- Tailwind CSS utilities

All components match the existing FADEMEX aesthetic.

## 🔌 Integration with Contact Forms

To save contact form submissions as leads, update your contact form handler:

```typescript
import { createLead } from '@/lib/actions/leads'

// In your contact form submission:
await createLead({
  full_name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company_name: formData.company,
})
```

## 🚨 Troubleshooting

### "Invalid credentials" when logging in
- Double-check the email/password
- Verify the user exists in **Authentication** → **Users**
- Ensure email confirmations are disabled (or confirm the email)

### "Row Level Security policy violation"
- Check that your admin email is in the RLS policies
- Verify you're signed in with the correct account
- Make sure the policies were created successfully

### Middleware redirect loop
- Check that `NEXT_PUBLIC_SITE_URL` is set correctly
- Clear your browser cookies
- Restart the dev server

### Can't see leads in the admin panel
- Check the browser console for errors
- Verify RLS policies allow SELECT for your user
- Test by inserting a lead directly in Supabase SQL Editor

## 📦 Production Deployment

Before deploying to production:

1. ✅ Enable email confirmations in Supabase Auth
2. ✅ Update `NEXT_PUBLIC_SITE_URL` to your production domain
3. ✅ Use strong passwords for admin accounts
4. ✅ Review and update admin email whitelist
5. ✅ Set up email templates in Supabase (optional)
6. ✅ Enable 2FA for admin users (recommended)

## 🎯 Next Steps

- Customize the lead form on your contact page
- Set up email notifications for new leads
- Add more admin features (export, bulk actions, etc.)
- Integrate with your existing CRM or email marketing tools

## 📞 Support

If you need help:
- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the [Next.js App Router docs](https://nextjs.org/docs/app)
- Contact your development team

---

**Built with:** Next.js 14, Supabase, TypeScript, Tailwind CSS
