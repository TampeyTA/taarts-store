'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function AuthForm() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')
    try {
      const { error } =
        mode === 'signin'
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password })

      if (error) throw error
      setMessage('Check your inbox or continue...')
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-12 space-y-6">
      <h2 className="text-xl font-bold text-center">
        {mode === 'signin' ? 'Log In' : 'Sign Up'}
      </h2>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <Button onClick={handleAuth} disabled={loading} className="w-full">
        {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          className="underline"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        >
          {mode === 'signin' ? 'Sign Up' : 'Sign In'}
        </button>
      </p>

      {message && (
        <div className="text-center text-sm text-red-500">{message}</div>
      )}
    </div>
  )
}
