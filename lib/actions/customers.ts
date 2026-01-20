'use server'

import { revalidatePath } from 'next/cache'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import type {
    Customer,
    CustomerStats,
    Contract,
    CustomerDocument,
    CreateCustomerData,
    CreateContractData,
    CreateDocumentData
} from '@/lib/types/customer'

// =====================================================
// Customer Operations
// =====================================================

// Get current customer profile (for logged-in customer)
export async function getCurrentCustomer(): Promise<Customer | null> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (error) {
        console.error('Error fetching current customer:', error)
        return null
    }

    return data as Customer
}

// Get customer stats for dashboard
export async function getCustomerStats(): Promise<CustomerStats | null> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data, error } = await supabase
        .from('customer_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (error) {
        console.error('Error fetching customer stats:', error)
        return null
    }

    return data as CustomerStats
}

// Create customer profile (after registration)
export async function createCustomerProfile(customerData: CreateCustomerData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
        .from('customers')
        .insert([{
            ...customerData,
            user_id: user.id,
            email: user.email || customerData.email
        }])
        .select()
        .single()

    if (error) {
        console.error('Error creating customer profile:', error)
        throw new Error('Failed to create customer profile')
    }

    revalidatePath('/portal')
    return data as Customer
}

// Update customer profile
export async function updateCustomerProfile(updates: Partial<CreateCustomerData>) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Not authenticated')

    const { error } = await supabase
        .from('customers')
        .update(updates)
        .eq('user_id', user.id)

    if (error) {
        console.error('Error updating customer profile:', error)
        throw new Error('Failed to update profile')
    }

    revalidatePath('/portal')
    return { success: true }
}

// =====================================================
// Contract Operations (Customer view)
// =====================================================

// Get all contracts for current customer
export async function getMyContracts(): Promise<Contract[]> {
    const supabase = await createClient()

    const customer = await getCurrentCustomer()
    if (!customer) return []

    const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching contracts:', error)
        return []
    }

    return data as Contract[]
}

// Get single contract
export async function getContractById(id: string): Promise<Contract | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching contract:', error)
        return null
    }

    return data as Contract
}

// =====================================================
// Document Operations (Customer view)
// =====================================================

// Helper to generate signed URL for a document
async function generateSignedUrl(supabase: any, fileUrl: string): Promise<string> {
    let filePath = fileUrl
    if (filePath.startsWith('http')) {
        // Try to extract path from public URL if possible
        // Format: .../storage/v1/object/public/bucket-name/path/to/file
        const publicMarker = '/customer-documents/'
        const index = filePath.indexOf(publicMarker)
        if (index !== -1) {
            filePath = filePath.substring(index + publicMarker.length)
        } else {
            return fileUrl // Can't sign it, return original
        }
    }

    const { data: signed } = await supabase.storage
        .from('customer-documents')
        .createSignedUrl(filePath, 3600) // 1 hour expiry

    return signed?.signedUrl || fileUrl
}

// Generate signed URLs for an array of documents
async function addSignedUrlsToDocuments(supabase: any, documents: CustomerDocument[]): Promise<CustomerDocument[]> {
    return Promise.all(documents.map(async (doc) => ({
        ...doc,
        file_url: await generateSignedUrl(supabase, doc.file_url)
    })))
}

// Get all documents for current customer
export async function getMyDocuments(): Promise<CustomerDocument[]> {
    const supabase = await createClient()

    const customer = await getCurrentCustomer()
    if (!customer) return []

    const result = await supabase
        .from('customer_documents')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false })

    if (result.error) {
        console.error('Error fetching documents:', result.error)
        return []
    }

    const data = result.data as CustomerDocument[] || []
    return addSignedUrlsToDocuments(supabase, data)
}

// Upload document record (after file upload to storage)
export async function createDocument(docData: CreateDocumentData) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('customer_documents')
        .insert([docData])
        .select()
        .single()

    if (error) {
        console.error('Error creating document record:', error)
        throw new Error('Failed to save document')
    }

    revalidatePath('/portal/documents')
    return data as CustomerDocument
}

// =====================================================
// Admin Operations
// =====================================================

// Get all customers (admin only)
export async function getAllCustomers(): Promise<Customer[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching all customers:', error)
        return []
    }

    return data as Customer[]
}

// Get customer by ID with contracts and documents (admin only)
export async function getCustomerWithDetails(customerId: string): Promise<{
    customer: Customer | null
    contracts: Contract[]
    documents: CustomerDocument[]
}> {
    const supabase = await createClient()

    const [customerResult, contractsResult, documentsResult] = await Promise.all([
        supabase.from('customers').select('*').eq('id', customerId).single(),
        supabase.from('contracts').select('*').eq('customer_id', customerId).order('created_at', { ascending: false }),
        supabase.from('customer_documents').select('*').eq('customer_id', customerId).order('created_at', { ascending: false })
    ])

    const documents = (documentsResult.data || []) as CustomerDocument[]
    const documentsWithUrls = await addSignedUrlsToDocuments(supabase, documents)

    return {
        customer: customerResult.data as Customer | null,
        contracts: (contractsResult.data || []) as Contract[],
        documents: documentsWithUrls
    }
}

// Create contract (admin only)
export async function createContract(contractData: CreateContractData) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('contracts')
        .insert([contractData])
        .select()
        .single()

    if (error) {
        console.error('Error creating contract:', error)
        throw new Error('Failed to create contract')
    }

    revalidatePath('/admin/customers')
    return data as Contract
}

// Update contract (admin only)
export async function updateContract(id: string, updates: Partial<CreateContractData>) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('contracts')
        .update(updates)
        .eq('id', id)

    if (error) {
        console.error('Error updating contract:', error)
        throw new Error('Failed to update contract')
    }

    revalidatePath('/admin/customers')
    return { success: true }
}

// Delete contract (admin only)
export async function deleteContract(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('contracts')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting contract:', error)
        throw new Error('Failed to delete contract')
    }

    revalidatePath('/admin/customers')
    return { success: true }
}

// Update document status (admin only)
export async function updateDocumentStatus(
    id: string,
    status: CustomerDocument['status'],
    adminNotes?: string
) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
        .from('customer_documents')
        .update({
            status,
            admin_notes: adminNotes,
            reviewed_at: new Date().toISOString(),
            reviewed_by: user?.id
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating document status:', error)
        throw new Error('Failed to update document')
    }

    revalidatePath('/admin/customers')
    return { success: true }
}

// Update customer status (admin only)
export async function updateCustomerStatus(id: string, status: Customer['status']) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('customers')
        .update({ status })
        .eq('id', id)

    if (error) {
        console.error('Error updating customer status:', error)
        throw new Error('Failed to update customer status')
    }

    revalidatePath('/admin/customers')
    return { success: true }
}

// Get all documents with customer info (admin only)
export async function getAllDocuments(): Promise<(CustomerDocument & { customers: { id: string; full_name: string; company_name: string | null } | null })[]> {
    const supabase = await createClient()

    const { data: documents, error } = await supabase
        .from('customer_documents')
        .select(`
            *,
            customers:customer_id (
                id,
                full_name,
                company_name
            )
        `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching all documents:', error)
        return []
    }

    const docs = documents || []

    // Generate signed URLs for all documents
    const docsWithUrls = await Promise.all(docs.map(async (doc) => ({
        ...doc,
        file_url: await generateSignedUrl(supabase, doc.file_url)
    })))

    return docsWithUrls as any
}
