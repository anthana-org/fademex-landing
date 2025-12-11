import { LoginForm } from './_components/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-ink mb-2">
              FADEMEX
            </h1>
          </Link>
          <p className="text-ink/70">Admin Portal</p>
        </div>

        {/* Login Form */}
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold text-ink mb-6">Sign In</h2>
          <LoginForm />
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-ink/70 hover:text-ink transition-colors"
          >
            ← Back to website
          </Link>
        </div>
      </div>

      {/* Background Effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/10 rounded-full filter blur-[100px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>
    </div>
  )
}
