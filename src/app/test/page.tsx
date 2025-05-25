import { createServerSupabaseClient } from '@/utils/supabase/server' // or wherever yours is
import { redirect } from 'next/navigation'

export default async function TestPage() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return <div className ="text-15xl font-bold text-yellow-300 ">No session. You are not logged in.</div>
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Your user ID: {session.user.id}</p>
      <p>Email: {session.user.email}</p>
    </div>
  )
}
