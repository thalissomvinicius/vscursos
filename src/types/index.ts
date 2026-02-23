// ─── User & Auth ───────────────────────────────────────────────────

export interface AuthUser {
    id: string
    email: string
    name?: string
}

export interface AdminUser {
    id: string
    email: string
    name: string
    created_at: string
    has_access: boolean
    is_admin: boolean
}

// ─── Modules & Progress ────────────────────────────────────────────

export interface ModuleMeta {
    slug: string
    title: string
    description: string
    icon: string
    order: number
    gradient: string
}

export interface ProgressRecord {
    user_id: string
    module_slug: string
    completed: boolean
    updated_at?: string
}

// ─── Quiz ──────────────────────────────────────────────────────────

export interface QuizQuestion {
    question: string
    options: string[]
    answer: number
}

// ─── Certificate ───────────────────────────────────────────────────

export interface CertificateData {
    user_id: string
    user_name: string
    code: string
    created_at?: string
}

export interface CertificatePDFParams {
    userName: string
    courseName: string
    issuedBy: string
    code: string
    date: string
    verifyUrl: string
}

// ─── Purchase ──────────────────────────────────────────────────────

export interface PurchaseRecord {
    user_id: string
    email: string
    stripe_session_id: string
    stripe_customer_id: string
    paid: boolean
}
