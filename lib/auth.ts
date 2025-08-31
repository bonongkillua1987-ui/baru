
import { supabase } from './supabase'
import { User } from '../types'

export class AuthService {
  static async signUp(email: string, password: string, userData: Partial<User>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.fullName,
          company_name: userData.companyName,
          role: userData.role || 'Member'
        }
      }
    })

    if (error) {
      console.error('Error signing up:', error)
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Error signing in:', error)
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error signing out:', error)
      return { error: error.message }
    }

    return { error: null }
  }

  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Error getting current user:', error)
      return null
    }

    return user
  }

  static onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  }
}
