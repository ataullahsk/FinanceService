import { supabase } from '../lib/supabase'
import type { LoanType } from '../lib/supabase'

export const loanTypeService = {
  // Get all active loan types (public)
  async getActiveLoanTypes() {
    const { data, error } = await supabase
      .from('loan_types')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (error) throw error
    return data
  },

  // Get loan type by ID
  async getLoanTypeById(id: number) {
    const { data, error } = await supabase
      .from('loan_types')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Admin: Get all loan types
  async getAllLoanTypes() {
    const { data, error } = await supabase
      .from('loan_types')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  },

  // Admin: Create new loan type
  async createLoanType(loanTypeData: Omit<LoanType, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('loan_types')
      .insert([loanTypeData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Update loan type
  async updateLoanType(id: number, loanTypeData: Partial<LoanType>) {
    const { data, error } = await supabase
      .from('loan_types')
      .update({
        ...loanTypeData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Delete loan type
  async deleteLoanType(id: number) {
    const { error } = await supabase
      .from('loan_types')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Admin: Toggle loan type status
  async toggleLoanTypeStatus(id: number) {
    const { data: currentData, error: fetchError } = await supabase
      .from('loan_types')
      .select('is_active')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    const { data, error } = await supabase
      .from('loan_types')
      .update({
        is_active: !currentData.is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}