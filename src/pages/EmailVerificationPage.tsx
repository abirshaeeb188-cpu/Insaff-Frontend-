import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ApiError } from '../lib/api';
import logoImg from '../imports/logo.png';

export default function EmailVerificationPage() {
  const {
    navigate,
    verifyEmail,
    resendVerification,
    pendingVerificationEmail,
  } = useApp();
  const [email, setEmail] = useState(pendingVerificationEmail || '');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...code];
    next[i] = value;
    setCode(next);
    if (value && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !code[i] && i > 0)
      inputsRef.current[i - 1]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter the email you registered with.');
      return;
    }
    if (code.some((c) => !c)) {
      setError('Please enter the full 6-digit code.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await verifyEmail(email.trim(), code.join(''));
      navigate('home');
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email.includes('@')) {
      setError('Please enter the email you registered with.');
      return;
    }
    setError('');
    setResending(true);
    try {
      await resendVerification(email.trim());
      setResent(true);
      setTimeout(() => setResent(false), 4000);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14202B] flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={logoImg}
            alt="INSAF"
            className="h-20 w-20 mx-auto rounded-full object-contain mb-6 shadow-lg"
          />
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Verify Your Email
          </h1>
          <p className="text-white/45 text-sm">
            {pendingVerificationEmail ? (
              <>
                Enter the 6-digit code we sent to{' '}
                <span className="text-white">{pendingVerificationEmail}</span>
              </>
            ) : (
              'Enter your email and the 6-digit code we sent you'
            )}
          </p>
        </div>

        <div className="bg-[#1C2C3A] border border-[#C89249]/20 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
              {error}
            </div>
          )}
          {resent && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 mb-6 text-green-400 text-sm">
              A new code has been sent to your email.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!pendingVerificationEmail && (
              <div>
                <label className="text-white/70 text-sm font-semibold block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahmed@company.ae"
                  className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-[#C89249] transition-colors"
                />
              </div>
            )}
            <div className="flex justify-between gap-2">
              {code.map((c, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  value={c}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  maxLength={1}
                  inputMode="numeric"
                  className="w-full aspect-square text-center text-xl font-bold bg-[#14202B] border border-white/15 focus:border-[#C89249] rounded-xl text-white outline-none transition-colors"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C89249] hover:bg-[#E0B368] disabled:opacity-60 text-[#14202B] font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C89249]/25 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#14202B]/30 border-t-[#14202B] rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          <p className="text-center text-white/45 text-sm mt-6">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-[#C89249] font-semibold hover:underline disabled:opacity-60">
              {resending ? 'Sending...' : 'Resend Code'}
            </button>
          </p>
        </div>

        <p className="text-center text-white/40 text-sm mt-8">
          <button
            onClick={() => navigate('login')}
            className="text-[#C89249] font-semibold hover:underline">
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
}
