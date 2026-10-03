import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApiError } from '../lib/api';

export default function ProfilePage() {
  const { user, updateProfile, navigate } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center p-8 pt-32">
        <div className="text-center">
          <p className="text-[#20262E]/60 mb-4">
            You must be logged in to view this page.
          </p>
          <button
            onClick={() => navigate('login')}
            className="bg-[#C89249] text-[#14202B] font-bold px-8 py-3 rounded-xl">
            Login
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      await updateProfile({
        fullName: form.name.trim(),
        phone: form.phone.trim() || undefined,
      });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Header */}
      <div className="bg-[#14202B] pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-8">
            <button
              onClick={() => navigate('home')}
              className="text-white/50 hover:text-[#C89249] transition-colors">
              Home
            </button>
            <span className="text-white/25">/</span>
            <span className="text-[#C89249]">My Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            My Profile
          </h1>
          <div className="gold-divider" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {saved && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-3 flex items-center gap-3">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-400 text-sm font-semibold">
              Profile updated successfully!
            </p>
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3 text-red-400 text-sm font-semibold">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#14202B]/8 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
              <div className="mb-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#2C4356] rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <span className="text-white text-4xl font-extrabold">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h2 className="text-[#14202B] text-lg sm:text-xl font-extrabold mb-1 break-words">
                {user.name}
              </h2>
              <p className="text-[#20262E]/50 text-sm mb-1 break-all">{user.email}</p>
              {user.phone && (
                <p className="text-[#20262E]/40 text-xs">{user.phone}</p>
              )}
              <div className="mt-5 pt-5 border-t border-[#14202B]/8">
                <div className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Active Account
                </div>
              </div>
            </div>

            <div className="mt-4 bg-[#14202B] border border-[#C89249]/20 rounded-2xl p-6">
              <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-4">
                Quick Links
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('settings')}
                  className="w-full flex items-center gap-3 text-white/70 hover:text-white text-sm py-2 transition-colors text-left group">
                  <svg
                    className="w-4 h-4 text-[#C89249]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </button>
                <a
                  href="https://wa.me/971566300173?text=Hi%2C%20I%27d%20like%20to%20request%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 text-white/70 hover:text-white text-sm py-2 transition-colors text-left">
                  <svg
                    className="w-4 h-4 text-[#C89249]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Request a Quote
                </a>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#14202B]/8 rounded-2xl p-5 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-6">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#14202B]">
                  Personal Information
                </h3>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 shrink-0 text-sm font-semibold text-[#2C4356] hover:text-[#C89249] transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="text-[#20262E]/60 text-xs font-bold uppercase tracking-wide block mb-2">
                      Full Name
                    </label>
                    {editing ? (
                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] bg-[#F8F6F2]"
                      />
                    ) : (
                      <p className="text-[#14202B] font-semibold py-3 border-b border-[#14202B]/8 break-words">
                        {user.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[#20262E]/60 text-xs font-bold uppercase tracking-wide block mb-2">
                      Email Address
                    </label>
                    <p className="text-[#14202B] font-semibold py-3 border-b border-[#14202B]/8 break-words">
                      {user.email}
                    </p>
                    {editing && (
                      <p className="text-[#20262E]/40 text-xs mt-1">
                        Email can't be changed here.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-[#20262E]/60 text-xs font-bold uppercase tracking-wide block mb-2">
                    Phone Number
                  </label>
                  {editing ? (
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+971 50 000 0000"
                      className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] bg-[#F8F6F2]"
                    />
                  ) : (
                    <p className="text-[#14202B] font-semibold py-3 border-b border-[#14202B]/8 break-words">
                      {user.phone || '—'}
                    </p>
                  )}
                </div>
              </div>

              {editing && (
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#C89249] hover:bg-[#E0B368] disabled:opacity-60 text-[#14202B] font-bold px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C89249]/25">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setError('');
                      setForm({
                        name: user.name,
                        email: user.email,
                        phone: user.phone || '',
                      });
                    }}
                    className="border border-[#14202B]/20 text-[#14202B] font-semibold px-6 py-3 rounded-xl transition-all hover:bg-[#14202B]/5">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
