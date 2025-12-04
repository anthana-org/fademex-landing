-- =====================================================
-- FADEMEX Admin CRM - Supabase Database Setup
-- =====================================================
-- Run this in your Supabase SQL Editor to set up the database

-- 1. Create the leads table
-- =====================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Contacted', 'Closed', 'Archived')),
    contacted BOOLEAN NOT NULL DEFAULT FALSE,
    admin_notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create an index for better query performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);

-- 3. Create a function to automatically update the updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Create a trigger to call the function
-- =====================================================
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- 5. Enable RLS on the leads table
-- =====================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 6. Policy: Public users can INSERT (register as leads)
-- =====================================================
CREATE POLICY "Anyone can create leads"
    ON public.leads
    FOR INSERT
    TO public
    WITH CHECK (true);

-- 7. Policy: Only authenticated admin users can SELECT
-- =====================================================
-- Option A: Allow specific email addresses (recommended for initial setup)
CREATE POLICY "Admins can view all leads"
    ON public.leads
    FOR SELECT
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
            -- Add more admin emails here
        )
    );

-- Option B: Use custom claims (requires additional setup in Supabase Auth)
-- Uncomment this and comment out Option A if you set up custom claims
-- CREATE POLICY "Admins can view all leads"
--     ON public.leads
--     FOR SELECT
--     TO authenticated
--     USING (
--         auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
--     );

-- 8. Policy: Only authenticated admin users can UPDATE
-- =====================================================
CREATE POLICY "Admins can update leads"
    ON public.leads
    FOR UPDATE
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
            -- Add more admin emails here
        )
    )
    WITH CHECK (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
            -- Add more admin emails here
        )
    );

-- 9. Policy: Only authenticated admin users can DELETE
-- =====================================================
CREATE POLICY "Admins can delete leads"
    ON public.leads
    FOR DELETE
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
            -- Add more admin emails here
        )
    );

-- =====================================================
-- OPTIONAL: Create a view for admin statistics
-- =====================================================
CREATE OR REPLACE VIEW public.lead_stats AS
SELECT
    COUNT(*) AS total_leads,
    COUNT(*) FILTER (WHERE contacted = FALSE) AS pending_contact,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS new_this_week,
    COUNT(*) FILTER (WHERE status = 'New') AS status_new,
    COUNT(*) FILTER (WHERE status = 'In Progress') AS status_in_progress,
    COUNT(*) FILTER (WHERE status = 'Contacted') AS status_contacted,
    COUNT(*) FILTER (WHERE status = 'Closed') AS status_closed,
    COUNT(*) FILTER (WHERE status = 'Archived') AS status_archived
FROM public.leads;

-- Grant access to the view for authenticated users
GRANT SELECT ON public.lead_stats TO authenticated;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Next steps:
-- 1. Update the admin email addresses in the policies above
-- 2. Set up Supabase Auth (Email/Password or OAuth)
-- 3. Create your admin user account
-- 4. Configure environment variables in your Next.js app
