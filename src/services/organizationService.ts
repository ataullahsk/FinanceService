import { supabase } from '../lib/supabase'
import type { OrganizationInfo } from '../lib/supabase'

export const organizationService = {
  // Get organization info (public)
  async getOrganizationInfo() {
    const { data, error } = await supabase
      .from('organization_info')
      .select('*')
      .eq('id', 1)
      .single()

    if (error) {
      // If no organization info exists, return default
      if (error.code === 'PGRST116') {
        return {
          id: 1,
          name: 'RS FINANCE SERVICE',
          address: 'Nutunhat, Near Indian Oil Petrol Pump, West Bengal',
          phone: '8391808557',
          email: 'info@rsfinanceservice.com',
          description: 'RS Finance Service is a trusted financial services provider offering comprehensive loan solutions for individuals and businesses.',
          established_year: '2019',
          license_number: 'NBFC-MFI-2019-001',
          website: 'www.rsfinanceservice.com'
        }
      }
      throw error
    }
    return data
  },

  // Admin: Update organization info
  async updateOrganizationInfo(orgData: Partial<OrganizationInfo>) {
    const { data, error } = await supabase
      .from('organization_info')
      .upsert({
        id: 1,
        ...orgData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}