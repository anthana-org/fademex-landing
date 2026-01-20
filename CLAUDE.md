# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FADEMEX Landing is a Next.js 14 application for a solar energy consulting company in Mexico. It combines a public marketing landing page with two authenticated portals: an admin dashboard for managing leads/customers and a customer portal for clients to manage documents and contracts.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

### Route Groups & Authentication

- `/` - Public landing page and marketing content
- `/admin/*` - Protected admin dashboard (requires `admin_users` table entry with `status: 'active'`)
- `/portal/*` - Protected customer portal (requires Supabase auth)
- `/portal/login`, `/portal/register` - Public customer auth pages
- `/admin/invite/[token]` - Public admin invite acceptance page

### Authentication Flow

Middleware (`middleware.ts` → `lib/supabase/middleware.ts`) handles route protection:
- Admins are verified against `admin_users` table (not just Supabase auth)
- Non-admin authenticated users accessing `/admin/*` are redirected to `/portal`
- Unauthenticated users are redirected to login pages

### Supabase Clients

Two server-side clients in `lib/supabase/server.ts`:
- `createClient()` - Uses publishable key, respects RLS policies
- `createAdminClient()` - Uses secret key, bypasses RLS (use sparingly for admin operations)

Client-side: `lib/supabase/client.ts` for browser components

### Server Actions

Located in `lib/actions/`:
- `leads.ts` - Lead CRUD operations with `revalidatePath('/admin')`
- `customers.ts` - Customer management
- `admins.ts` - Admin user management

### Type Definitions

`lib/types/` contains TypeScript interfaces for database entities:
- `lead.ts` - Lead, LeadStats, LeadStatus types
- `customer.ts` - Customer, Contract, CustomerDocument types
- `admin.ts` - Admin user types

### Component Organization

- `components/` - Shared components (ContactForm, Footer, Navigation, MexicoMap)
- `app/*/_components/` - Route-specific components (e.g., `app/admin/_components/`)

## Environment Variables

Required for full functionality:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- `SUPABASE_SECRET_KEY` (or legacy `SUPABASE_SERVICE_ROLE_KEY`) - For admin operations
- `RESEND_API_KEY` - Email sending
- `EMAIL_FROM` - Sender email address
- `ADMIN_EMAIL` - Admin notification recipient

## Key Patterns

- Spanish language throughout UI (`lang="es"` in root layout)
- Server Components by default; use `'use client'` directive only when needed
- Server Actions with `'use server'` for data mutations
- `revalidatePath()` after mutations to refresh cached data
- Tailwind CSS with custom design tokens (see `tailwind.config.ts` for colors like `canvas`, `ink`, `highlight`, `accent-gold`)
