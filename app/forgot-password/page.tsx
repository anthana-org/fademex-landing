import { ForgotPasswordForm } from './_components/ForgotPasswordForm'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-canvas text-ink relative overflow-hidden flex items-center justify-center p-6">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
                <div className="absolute top-0 left-0 w-[480px] h-[480px] bg-highlight/20 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-accent-gold/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-4xl font-extrabold text-ink mb-2 tracking-tight">
                            FADEMEX
                        </h1>
                    </Link>
                    <p className="text-ink/60 text-sm uppercase tracking-[0.2em]">Admin Portal</p>
                </div>

                {/* Forgot Password Form */}
                <div className="glass-panel p-8 bg-white/80">
                    <h2 className="text-2xl font-bold text-ink mb-6">Forgot Password</h2>
                    <ForgotPasswordForm />
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-sm text-ink/60 hover:text-ink transition-colors"
                    >
                        &larr; Back to website
                    </Link>
                </div>
            </div>
        </div>
    )
}
