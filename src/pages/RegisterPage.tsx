import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApiError } from '../lib/api';
import logoImg from '../imports/logo.png';

export default function RegisterPage() {
  const { navigate, register } = useApp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.includes('@')) e.email = 'Valid email is required';
    if (form.password.length < 8)
      e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (!agreed) e.agreed = 'Please accept the terms to continue';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await register({
        fullName: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate('verify-email');
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Something went wrong. Please try again.';
      setErrors({ form: message });
    } finally {
      setLoading(false);
    }
  };

  const strength =
    form.password.length === 0
      ? 0
      : form.password.length < 6
        ? 1
        : form.password.length < 10
          ? 2
          : 3;
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="min-h-screen bg-[#14202B] flex">
      {/* Left decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1C2C3A] relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14202B] via-[#1C2C3A] to-[#2C4356]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C89249]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C89249]/8 rounded-full blur-2xl" />
        <div className="relative text-center">
          <img
            src={logoImg}
            alt="INSAF"
            className="h-24 w-auto mx-auto rounded-full object-contain mb-8 shadow-lg"
          />
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Join Our Network
          </h2>
          <p className="text-white/55 leading-relaxed max-w-sm mx-auto">
            Create your account to access exclusive services, track your orders,
            and connect with our team for all your construction material needs.
          </p>
          <div className="mt-10 space-y-4">
            {[
              'Premium material access',
              'Order tracking & history',
              'Dedicated support',
              'Instant quote requests',
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 text-left">
                <div className="w-5 h-5 bg-[#C89249]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-[#C89249]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white/70 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 pt-6 sm:pt-8">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-white/60 hover:text-[#C89249] text-sm font-medium transition-colors mb-6 lg:mb-10 self-start">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </button>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-6">
              <img
                src={logoImg}
                alt="INSAF"
                className="h-20 w-auto mx-auto rounded-full object-contain mb-2 shadow-md"
              />
            </div>
            <div className="bg-[#1C2C3A] border border-[#C89249]/20 rounded-2xl p-5 sm:p-8 shadow-2xl">
              <h1 className="text-2xl font-extrabold text-white mb-1">
                Create Your Account
              </h1>
              <p className="text-white/45 text-sm mb-8">
                Fill in your details to get started
              </p>

              {errors.form && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField label="Full Name" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ahmed Al Rashid"
                    className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm"
                  />
                </FormField>

                <FormField label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="ahmed@company.ae"
                    className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm"
                  />
                </FormField>

                <FormField label="Password" error={errors.password}>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      placeholder="Min. 8 characters"
                      className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                      {showPass ? <EyeOff /> : <EyeOn />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColors[strength] : 'bg-white/10'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-white/50">
                        {strengthLabels[strength]}
                      </span>
                    </div>
                  )}
                </FormField>

                <FormField label="Confirm Password" error={errors.confirm}>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={form.confirm}
                      onChange={(e) =>
                        setForm({ ...form, confirm: e.target.value })
                      }
                      placeholder="Repeat password"
                      className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                      {showConfirm ? <EyeOff /> : <EyeOn />}
                    </button>
                  </div>
                </FormField>

                <div>
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      aria-pressed={agreed}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors cursor-pointer ${agreed ? 'bg-[#C89249] border-[#C89249]' : 'border-white/25 hover:border-[#C89249]/50'}`}>
                      {agreed && (
                        <svg
                          className="w-3 h-3 text-[#14202B]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                    <span className="text-white/60 text-xs leading-relaxed">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('terms');
                        }}
                        className="text-[#C89249] hover:underline">
                        Terms & Conditions
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('privacy-policy');
                        }}
                        className="text-[#C89249] hover:underline">
                        Privacy Policy
                      </button>
                    </span>
                  </div>
                  {errors.agreed && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.agreed}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C89249] hover:bg-[#E0B368] disabled:opacity-60 text-[#14202B] font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C89249]/25 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#14202B]/30 border-t-[#14202B] rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <p className="text-center text-white/45 text-sm mt-6">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('login')}
                  className="text-[#C89249] font-semibold hover:underline">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="text-white/70 text-sm font-semibold block mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

function EyeOn() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}
