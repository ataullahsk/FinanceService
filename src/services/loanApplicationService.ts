import { supabase } from '../lib/supabase'
import type { LoanApplication } from '../lib/supabase'

export const loanApplicationService = {
  // Submit a new loan application
  async submitApplication(applicationData: Omit<LoanApplication, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('loan_applications')
      .insert([{
        ...applicationData,
        application_id: `RSF${Date.now()}`,
        status: 'PENDING'
      }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get application by application ID (for public status check)
  async getApplicationByApplicationId(applicationId: string) {
    const { data, error } = await supabase
      .from('loan_applications')
      .select(`
        application_id,
        status,
        created_at,
        updated_at,
        loan_type,
        loan_amount,
        first_name,
        last_name
      `)
      .eq('application_id', applicationId)
      .single()

    if (error) throw error
    return data
  },

  // Admin: Get all applications with pagination
  async getAllApplications(page = 1, limit = 10, status?: string, searchTerm?: string) {
    let query = supabase
      .from('loan_applications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status.toUpperCase())
    }

    if (searchTerm) {
      query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,application_id.ilike.%${searchTerm}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await query.range(from, to)

    if (error) throw error
    return { data, count }
  },

  // Admin: Update application status
  async updateApplicationStatus(id: number, status: string, reviewedBy: string, comments?: string) {
    const { data, error } = await supabase
      .from('loan_applications')
      .update({
        status: status.toUpperCase(),
        reviewed_by: reviewedBy,
        review_comments: comments,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Get application statistics
  async getApplicationStats() {
    const { data: totalApps, error: totalError } = await supabase
      .from('loan_applications')
      .select('id', { count: 'exact' })

    const { data: pendingApps, error: pendingError } = await supabase
      .from('loan_applications')
      .select('id', { count: 'exact' })
      .eq('status', 'PENDING')

    const { data: approvedApps, error: approvedError } = await supabase
      .from('loan_applications')
      .select('id', { count: 'exact' })
      .eq('status', 'APPROVED')

    const { data: todayApps, error: todayError } = await supabase
      .from('loan_applications')
      .select('id', { count: 'exact' })
      .gte('created_at', new Date().toISOString().split('T')[0])

    if (totalError || pendingError || approvedError || todayError) {
      throw totalError || pendingError || approvedError || todayError
    }

    return {
      total: totalApps?.length || 0,
      pending: pendingApps?.length || 0,
      approved: approvedApps?.length || 0,
      today: todayApps?.length || 0
    }
  }
}