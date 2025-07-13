import { supabase } from '../lib/supabase'
import type { ContactMessage } from '../lib/supabase'

export const contactService = {
  // Submit contact message
  async submitContactMessage(messageData: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        ...messageData,
        is_read: false
      }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Get all contact messages
  async getAllMessages(page = 1, limit = 10, isRead?: boolean) {
    let query = supabase
      .from('contact_messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (isRead !== undefined) {
      query = query.eq('is_read', isRead)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await query.range(from, to)

    if (error) throw error
    return { data, count }
  },

  // Admin: Mark message as read/unread
  async updateMessageReadStatus(id: number, isRead: boolean) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ is_read: isRead })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Delete message
  async deleteMessage(id: number) {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Admin: Get unread message count
  async getUnreadCount() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('id', { count: 'exact' })
      .eq('is_read', false)

    if (error) throw error
    return data?.length || 0
  }
}