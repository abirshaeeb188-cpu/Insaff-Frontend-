import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ApiError } from '../lib/api'
import logoImg from '../imports/logo.png'

export default function ResetPasswordPage() {
  const { navigate, resetPassword, forgotPassword, pendingResetEmail } = useApp()
  const [email, setEmail] = useState(pendingResetEmail || '')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500']
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) { setError('Please enter the email you requested the reset code for.'); return }
    if (!/^\d{6}$/.test(code)) { setError('Please enter the 6-digit reset code from your email.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    setError('')
    setLoading(true)
    try {
      await resetPassword(email.trim(), code, password)
      navigate('login')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email.includes('@')) { setError('Please enter your email first.'); return }
    setError('')
    setResending(true)
    try {
      await forgotPassword(email.trim())
      setResent(true)
      setTimeout(() => setResent(false), 4000)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#14202B] flex items-center justify-center p-4 sm:p-6 py-10 sm:pt-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoImg} alt="INSAF" className="h-20 w-auto mx-auto rounded-full object-contain mb-6 shadow-lg" />
          <h1 className="text-3xl font-extrabold text-white mb-2">Reset Password</h1>
          <p className="text-white/45 text-sm">Create a new password for your account</p>
        </div>

        <div className="bg-[#1C2C3A] border border-[#C89249]/20 rounded-2xl p-5 sm:p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
              {error}
            </div>
          )}
          {resent && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 mb-6 text-green-400 text-sm">
              A new reset code has been sent to your email.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!pendingResetEmail && (
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
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white/70 text-sm font-semibold">Reset Code</label>
                <button type="button" onClick={handleResend} disabled={resending} className="text-[#C89249] text-xs font-semibold hover:underline disabled:opacity-60">
                  {resending ? 'Sending...' : 'Resend Code'}
                </button>
              </div>
              <input
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit code"
                inputMode="numeric"
                maxLength={6}
                className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-[#C89249] transition-colors tracking-widest"
              />
            </div>

            <div>
              <label className="text-white/70 text-sm font-semibold block mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-[#C89249] transition-colors pr-12"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-semibold">
                  {showPass ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {password && (
                <div className="flex gap-1.5 mt-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColors[strength] : 'bg-white/10'}`} />
                  ))}
                  <span className="text-xs text-white/40 ml-2">{strengthLabels[strength]}</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-white/70 text-sm font-semibold block mb-2">Confirm New Password</label>
              <input
                type={showPass ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
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
                  Resetting...
                </>
              ) : 'Reset Password'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/40 text-sm mt-8">
          <button onClick={() => navigate('login')} className="text-[#C89249] font-semibold hover:underline">Back to Login</button>
        </p>
      </div>
    </div>
  )
}
