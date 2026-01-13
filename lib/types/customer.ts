// Customer Portal Types

export interface Customer {
    id: string
    user_id: string
    created_at: string
    updated_at: string
    full_name: string
    email: string
    phone: string | null
    company_name: string | null
    monthly_electric_bill: string | null
    status: 'Active' | 'Inactive' | 'Pending'
}

export interface Contract {
    id: string
    customer_id: string
    created_at: string
    updated_at: string
    title: string
    description: string | null
    status: 'Pending' | 'Active' | 'Completed' | 'Cancelled'
    start_date: string | null
    end_date: string | null
    contract_number: string | null
    file_url: string | null
    admin_notes: string | null
}

export interface CustomerDocument {
    id: string
    customer_id: string
    created_at: string
    updated_at: string
    file_name: string
    file_type: 'pdf' | 'image' | 'word' | 'excel'
    file_size_bytes: number | null
    file_url: string
    status: 'Pending' | 'Reviewed' | 'Approved' | 'Rejected'
    category: string | null
    description: string | null
    admin_notes: string | null
    reviewed_at: string | null
    reviewed_by: string | null
}

export interface CustomerStats {
    customer_id: string
    user_id: string
    active_contracts: number
    total_contracts: number
    pending_documents: number
    total_documents: number
}

// Form types for creating/updating
export interface CreateCustomerData {
    full_name: string
    email: string
    phone?: string
    company_name?: string
    monthly_electric_bill?: string
}

export interface CreateContractData {
    customer_id: string
    title: string
    description?: string
    status?: Contract['status']
    start_date?: string
    end_date?: string
    contract_number?: string
    file_url?: string
}

export interface CreateDocumentData {
    customer_id: string
    file_name: string
    file_type: CustomerDocument['file_type']
    file_size_bytes?: number
    file_url: string
    category?: string
    description?: string
}
