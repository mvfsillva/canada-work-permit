import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const authenticate = async () => {
  try {
    const { session } = await supabase.auth.signIn({
      email: process.env.NEXT_PUBLIC_SUPABASE_USER,
      password: process.env.NEXT_PUBLIC_SUPABASE_PASSWORD
    })

    return session.access_token
  } catch (e) {
    // TODO: send this error to crashlytics or something like that
    console.error(e)
  }
}
