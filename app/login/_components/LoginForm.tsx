'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
        <div className="flex items-start gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">
          <Mail className="w-3 h-3" />
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@fademex.com"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-gold focus:outline-none transition-colors focus:bg-white/10"
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wide mb-2">
          <Lock className="w-3 h-3" />
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-gold focus:outline-none transition-colors focus:bg-white/10"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent-gold text-black font-medium py-3 rounded-lg hover:bg-accent-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-accent-gold/50"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Contact your administrator for access credentials
        </p>
      </div>
    </form>
  )
}
