
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ssxvurmcynbvdgtxndvf.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzeHZ1cm1jeW5idmRndHhuZHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1OTUwNzYsImV4cCI6MjA3MjE3MTA3Nn0.Gveul9WrDVLW--WtNzGFG7e7J56hgz5rKOPojfKWkoY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          company_name: string | null
          role: 'Admin' | 'Member'
          permissions: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          company_name?: string | null
          role?: 'Admin' | 'Member'
          permissions?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          company_name?: string | null
          role?: 'Admin' | 'Member'
          permissions?: string[] | null
          created_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          whatsapp: string | null
          since: string
          instagram: string | null
          status: string
          client_type: string
          last_contact: string
          portal_access_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          whatsapp?: string | null
          since?: string
          instagram?: string | null
          status?: string
          client_type?: string
          last_contact?: string
          portal_access_id?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          whatsapp?: string | null
          since?: string
          instagram?: string | null
          status?: string
          client_type?: string
          last_contact?: string
          portal_access_id?: string
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          client_id: string
          status: string
          project_type: string
          start_date: string
          end_date: string | null
          total_value: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          client_id: string
          status?: string
          project_type: string
          start_date?: string
          end_date?: string | null
          total_value?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          client_id?: string
          status?: string
          project_type?: string
          start_date?: string
          end_date?: string | null
          total_value?: number
          created_at?: string
        }
      }
    }
  }
}
