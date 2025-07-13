import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface LoanApplication {
  id?: number
  application_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  gender?: string
  marital_status?: string
  father_name?: string
  mother_name?: string
  current_address: string
  permanent_address?: string
  city: string
  state: string
  pincode: string
  residence_type?: string
  years_at_current_address?: number
  employment_type: string
  company_name?: string
  designation?: string
  work_experience?: number
  monthly_income: number
  additional_income?: number
  official_email?: string
  office_address?: string
  loan_type: string
  loan_amount: number
  loan_purpose: string
  preferred_tenure: number
  existing_loans?: string
  bank_account?: string
  ifsc_code?: string
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED'
  created_at?: string
  updated_at?: string
  reviewed_at?: string
  reviewed_by?: string
  review_comments?: string
}

export interface LoanType {
  id?: number
  name: string
  description: string
  interest_rate: number
  max_amount: number
  min_tenure: number
  max_tenure: number
  processing_fee: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface ContactMessage {
  id?: number
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  is_read: boolean
  created_at?: string
}

export interface OrganizationInfo {
  id?: number
  name: string
  address: string
  phone: string
  email: string
  description?: string
  established_year?: string
  license_number?: string
  website?: string
  logo_path?: string
  monday_hours?: string
  tuesday_hours?: string
  wednesday_hours?: string
  thursday_hours?: string
  friday_hours?: string
  saturday_hours?: string
  sunday_hours?: string
  facebook_url?: string
  twitter_url?: string
  linkedin_url?: string
  instagram_url?: string
  created_at?: string
  updated_at?: string
}

export interface Admin {
  id?: number
  username: string
  email: string
  full_name?: string
  is_active: boolean
  last_login?: string
  created_at?: string
  updated_at?: string
}