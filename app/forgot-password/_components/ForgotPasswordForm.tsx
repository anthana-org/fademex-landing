'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { requestPasswordReset } from '@/lib/actions/auth'

export function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const baseUrl = window.location.origin
            const redirectTo = `${baseUrl}/reset-password`

            const result = await requestPasswordReset(email, redirectTo)

            if (result.success) {
                setIsSuccess(true)
            } else if (result.error) {
                setError(result.error)
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.')
            console.error('Password reset error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-ink mb-2">Check your email</h2>
                    <p className="text-ink-light">
                        If an account exists with <span className="font-medium text-ink">{email}</span>,
                        you will receive a password reset link shortly.
                    </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-sm text-amber-800">
                        <strong>Note:</strong> The link will expire in 1 hour. Check your spam folder if you don&apos;t see the email.
                    </p>
                </div>

                <div className="text-center pt-4">
                    <Link
                        href="/login"
                        className="text-sm text-accent-teal hover:text-ink font-medium transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <div className="text-center mb-6">
                <p className="text-ink-light">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
            </div>

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

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent-gold text-ink font-semibold py-3.5 rounded-xl hover:bg-accent-gold-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-button hover:shadow-button-hover"
            >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center pt-2">
                <Link
                    href="/login"
                    className="text-sm text-accent-teal hover:text-ink font-medium transition-colors inline-flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
                </Link>
            </div>
        </form>
    )
}
