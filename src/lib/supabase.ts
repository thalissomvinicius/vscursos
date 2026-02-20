import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// --- Server-side (lazy init, only when called) ---

let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[Supabase Admin] Missing environment variables:', {
        url: !!supabaseUrl,
        serviceKey: !!supabaseServiceKey
      })
      throw new Error('Supabase Admin: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios.')
    }
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
  }
  return _supabaseAdmin
}

// --- Client-side (lazy singleton via getter) ---

let _supabaseClient: SupabaseClient | null = null

function getSupabaseClient() {
  if (!_supabaseClient) {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('[Supabase Client] Missing environment variables:', {
        url: !!supabaseUrl,
        anonKey: !!supabaseAnonKey
      })
      // Em vez de crashar silenciosamente, retornamos null ou lançamos um erro claro
      throw new Error('Supabase Client: NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórios no cliente.')
    }
    _supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabaseClient
}

// Proxy object that lazily initializes the Supabase client on first access.
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    try {
      const client = getSupabaseClient()
      const value = (client as unknown as Record<string | symbol, unknown>)[prop]
      if (typeof value === 'function') {
        return value.bind(client)
      }
      return value
    } catch (e) {
      console.error('[Supabase Proxy Error]', e)
      // Se falhar o init, retornamos um objeto que faliu graciosamente para não quebrar o render
      return () => { throw e }
    }
  },
})
