-- Add investment_range column to customers table
ALTER TABLE public.customers 
ADD COLUMN IF NOT EXISTS investment_range TEXT;
