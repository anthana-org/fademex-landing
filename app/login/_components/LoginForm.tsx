'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      if (data.user) {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
          <Mail className="w-3 h-3" />
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@fademex.com"
          className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium text-ink-light uppercase tracking-wide mb-2">
          <Lock className="w-3 h-3" />
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full bg-canvas border border-ink/10 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:border-accent-gold focus:outline-none transition-colors focus:bg-canvas-alt"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent-gold text-ink font-semibold py-3.5 rounded-xl hover:bg-accent-gold-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-button hover:shadow-button-hover"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-xs text-ink-light mb-2">
          Contact your administrator for access credentials
        </p>
        <Link
          href="/portal/login"
          className="text-sm text-accent-teal hover:text-ink font-medium transition-colors inline-flex items-center gap-1"
        >
          Customer Portal Login <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </form>
  )
}
