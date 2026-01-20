-- Rename investment_range column to monthly_electric_bill
ALTER TABLE public.customers 
RENAME COLUMN investment_range TO monthly_electric_bill;
