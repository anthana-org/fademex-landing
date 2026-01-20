-- =====================================================
-- FADEMEX Customer Portal - Database Setup
-- =====================================================
-- Run this in your Supabase SQL Editor to set up the customer portal tables

-- =====================================================
-- 1. Create the customers table
-- =====================================================
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Pending')),
    UNIQUE(user_id),
    UNIQUE(email)
);

-- Indexes for customers
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON public.customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON public.customers(created_at DESC);

-- =====================================================
-- 2. Create the contracts table
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Active', 'Completed', 'Cancelled')),
    start_date DATE,
    end_date DATE,
    contract_number TEXT,
    file_url TEXT, -- URL to contract PDF in storage
    admin_notes TEXT
);

-- Indexes for contracts
CREATE INDEX IF NOT EXISTS idx_contracts_customer_id ON public.contracts(customer_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON public.contracts(status);
CREATE INDEX IF NOT EXISTS idx_contracts_created_at ON public.contracts(created_at DESC);

-- =====================================================
-- 3. Create the customer_documents table (with history)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.customer_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL, -- 'pdf', 'image', 'word', 'excel'
    file_size_bytes BIGINT,
    file_url TEXT NOT NULL, -- URL to file in storage
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewed', 'Approved', 'Rejected')),
    category TEXT, -- Optional categorization
    description TEXT,
    admin_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES auth.users(id)
);

-- Indexes for documents
CREATE INDEX IF NOT EXISTS idx_documents_customer_id ON public.customer_documents(customer_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON public.customer_documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON public.customer_documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_file_type ON public.customer_documents(file_type);

-- =====================================================
-- 4. Create trigger for updated_at columns
-- =====================================================
-- Reuse existing function if it exists, or create it
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for each table
DROP TRIGGER IF EXISTS update_customers_updated_at ON public.customers;
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contracts_updated_at ON public.contracts;
CREATE TRIGGER update_contracts_updated_at
    BEFORE UPDATE ON public.contracts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_documents_updated_at ON public.customer_documents;
CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON public.customer_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. Enable Row Level Security (RLS)
-- =====================================================
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_documents ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 6. RLS Policies for customers table
-- =====================================================

-- Customers can view their own profile
CREATE POLICY "Customers can view own profile"
    ON public.customers
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Customers can update their own profile
CREATE POLICY "Customers can update own profile"
    ON public.customers
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Anyone authenticated can insert (for self-registration)
CREATE POLICY "Users can create own customer profile"
    ON public.customers
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all customers
CREATE POLICY "Admins can view all customers"
    ON public.customers
    FOR SELECT
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
            -- Add more admin emails here
        )
    );

-- Admins can update all customers
CREATE POLICY "Admins can update all customers"
    ON public.customers
    FOR UPDATE
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    )
    WITH CHECK (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    );

-- Admins can delete customers
CREATE POLICY "Admins can delete customers"
    ON public.customers
    FOR DELETE
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    );

-- =====================================================
-- 7. RLS Policies for contracts table
-- =====================================================

-- Customers can view their own contracts
CREATE POLICY "Customers can view own contracts"
    ON public.contracts
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE user_id = auth.uid()
        )
    );

-- Admins can view all contracts
CREATE POLICY "Admins can view all contracts"
    ON public.contracts
    FOR SELECT
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    );

-- Admins can insert contracts
CREATE POLICY "Admins can insert contracts"
    ON public.contracts
    FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    );

-- Admins can update contracts
CREATE POLICY "Admins can update contracts"
    ON public.contracts
    FOR UPDATE
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    )
    WITH CHECK (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    );

-- Admins can delete contracts
CREATE POLICY "Admins can delete contracts"
    ON public.contracts
    FOR DELETE
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    );

-- =====================================================
-- 8. RLS Policies for customer_documents table
-- =====================================================

-- Customers can view their own documents
CREATE POLICY "Customers can view own documents"
    ON public.customer_documents
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE user_id = auth.uid()
        )
    );

-- Customers can upload documents
CREATE POLICY "Customers can upload documents"
    ON public.customer_documents
    FOR INSERT
    TO authenticated
    WITH CHECK (
        customer_id IN (
            SELECT id FROM public.customers WHERE user_id = auth.uid()
        )
    );

-- Admins can view all documents
CREATE POLICY "Admins can view all documents"
    ON public.customer_documents
    FOR SELECT
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    );

-- Admins can update documents (for status changes, notes)
CREATE POLICY "Admins can update documents"
    ON public.customer_documents
    FOR UPDATE
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    )
    WITH CHECK (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    );

-- Admins can delete documents
CREATE POLICY "Admins can delete documents"
    ON public.customer_documents
    FOR DELETE
    TO authenticated
    USING (
        auth.jwt() ->> 'email' IN (
            'admin@fademex.com',
            'juanjo@anthana.com'
        )
    );

-- =====================================================
-- 9. Create views for portal statistics
-- =====================================================

-- Customer stats view (for dashboard)
CREATE OR REPLACE VIEW public.customer_stats AS
SELECT
    c.id as customer_id,
    c.user_id,
    COUNT(DISTINCT ct.id) FILTER (WHERE ct.status = 'Active') as active_contracts,
    COUNT(DISTINCT ct.id) as total_contracts,
    COUNT(DISTINCT d.id) FILTER (WHERE d.status = 'Pending') as pending_documents,
    COUNT(DISTINCT d.id) as total_documents
FROM public.customers c
LEFT JOIN public.contracts ct ON ct.customer_id = c.id
LEFT JOIN public.customer_documents d ON d.customer_id = c.id
GROUP BY c.id, c.user_id;

-- Grant access to the view
GRANT SELECT ON public.customer_stats TO authenticated;

-- Admin stats view for customer management
CREATE OR REPLACE VIEW public.admin_customer_stats AS
SELECT
    COUNT(*) as total_customers,
    COUNT(*) FILTER (WHERE status = 'Active') as active_customers,
    COUNT(*) FILTER (WHERE status = 'Pending') as pending_customers,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as new_this_week
FROM public.customers;

GRANT SELECT ON public.admin_customer_stats TO authenticated;

-- =====================================================
-- 10. Storage bucket setup instructions
-- =====================================================
-- Run this in Supabase Dashboard > Storage > Create New Bucket:
-- 
-- Bucket name: customer-documents
-- Public bucket: OFF (private)
--
-- Then add these storage policies:
--
-- Policy: Allow customers to upload to their own folder
-- Operation: INSERT
-- Target roles: authenticated
-- Policy definition: (bucket_id = 'customer-documents' AND auth.uid()::text = (storage.foldername(name))[1])
--
-- Policy: Allow customers to read their own files
-- Operation: SELECT
-- Target roles: authenticated
-- Policy definition: (bucket_id = 'customer-documents' AND auth.uid()::text = (storage.foldername(name))[1])
--
-- Policy: Allow admins full access
-- Operation: ALL
-- Target roles: authenticated
-- Policy definition: (bucket_id = 'customer-documents' AND auth.jwt() ->> 'email' IN ('admin@fademex.com', 'juanjo@anthana.com'))

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Next steps:
-- 1. Update the admin email addresses in the policies above
-- 2. Create the storage bucket 'customer-documents' in Supabase Dashboard
-- 3. Deploy the portal routes
