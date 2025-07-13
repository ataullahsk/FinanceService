import { supabase } from '../lib/supabase'
import type { Admin } from '../lib/supabase'

export const adminService = {
  // Admin login (simplified for demo)
  async login(username: string, password: string) {
    // In a real app, you would use Supabase Auth
    // For demo purposes, we'll check against a hardcoded admin
    if (username === 'admin' && password === 'rsfinance2024') {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single()

      if (error && error.code === 'PGRST116') {
        // Create default admin if doesn't exist
        const { data: newAdmin, error: createError } = await supabase
          .from('admins')
          .insert([{
            username: 'admin',
            email: 'admin@rsfinanceservice.com',
            full_name: 'System Administrator',
            is_active: true
          }])
          .select()
          .single()

        if (createError) throw createError
        return newAdmin
      }

      if (error) throw error

      // Update last login
      await supabase
        .from('admins')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.id)

      return data
    }

    throw new Error('Invalid credentials')
  },

  // Get admin profile
  async getAdminProfile(id: number) {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Update admin profile
  async updateAdminProfile(id: number, profileData: Partial<Admin>) {
    const { data, error } = await supabase
      .from('admins')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}