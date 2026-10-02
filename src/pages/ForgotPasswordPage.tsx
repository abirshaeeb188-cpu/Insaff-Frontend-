import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ApiError } from '../lib/api'
import logoImg from '../imports/logo.png'

export default function ForgotPasswordPage() {
  const { navigate, forgotPassword } = useApp()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return }
    setError('')
    setLoading(true)
    try {
      await forgotPassword(email.trim())
      setSent(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#14202B] flex items-center justify-center p-4 sm:p-6 py-10 sm:pt-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoImg} alt="INSAF" className="h-20 w-auto mx-auto rounded-full object-contain mb-6 shadow-lg" />
          <h1 className="text-3xl font-extrabold text-white mb-2">Forgot Password?</h1>
          <p className="text-white/45 text-sm">Enter your email and we'll send you a reset code</p>
        </div>

        <div className="bg-[#1C2C3A] border border-[#C89249]/20 rounded-2xl p-5 sm:p-8 shadow-2xl">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-[#C89249]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-[#C89249]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Check Your Inbox</h3>
              <p className="text-white/50 text-sm mb-6">We've sent a 6-digit reset code to <span className="text-white">{email}</span>.</p>
              <button onClick={() => navigate('reset-password')} className="text-[#C89249] font-semibold text-sm hover:underline">
                Continue to Reset Password
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-white/70 text-sm font-semibold block mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ahmed@company.ae"
                    className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-[#C89249] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C89249] hover:bg-[#E0B368] disabled:opacity-60 text-[#14202B] font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C89249]/25 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#14202B]/30 border-t-[#14202B] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-white/40 text-sm mt-8">
          <button onClick={() => navigate('login')} className="text-[#C89249] font-semibold hover:underline">Back to Login</button>
        </p>
      </div>
    </div>
  )
}
