import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ApiError } from '../lib/api'
import { IconUser, IconLock, IconBell, IconLogout } from '../components/Icons'

export default function SettingsPage() {
  const { user, updateProfile, changePassword, navigate, logout } = useApp()
  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'notifications'>('account')
  const [accountForm, setAccountForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' })
  const [notifications, setNotifications] = useState({ email: true, security: true })
  const [saved, setSaved] = useState('')
  const [accountSaving, setAccountSaving] = useState(false)
  const [accountError, setAccountError] = useState('')
  const [passSaving, setPassSaving] = useState(false)
  const [passError, setPassError] = useState('')

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center pt-32">
        <div className="text-center">
          <p className="text-[#20262E]/60 mb-4">Please login to access settings.</p>
          <button onClick={() => navigate('login')} className="bg-[#C89249] text-[#14202B] font-bold px-8 py-3 rounded-xl">Login</button>
        </div>
      </div>
    )
  }

  const handleSaveAccount = async () => {
    setAccountError('')
    setAccountSaving(true)
    try {
      await updateProfile({ fullName: accountForm.name.trim(), phone: accountForm.phone.trim() || undefined })
      setSaved('account')
      setTimeout(() => setSaved(''), 3000)
    } catch (err) {
      setAccountError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setAccountSaving(false)
    }
  }

  const handleSavePassword = async () => {
    setPassError('')
    if (passForm.newPass.length < 8) { setPassError('New password must be at least 8 characters.'); return }
    if (passForm.newPass !== passForm.confirm) { setPassError('New passwords do not match.'); return }
    setPassSaving(true)
    try {
      await changePassword(passForm.current, passForm.newPass)
      setSaved('security')
      setPassForm({ current: '', newPass: '', confirm: '' })
      setTimeout(() => setSaved(''), 3000)
    } catch (err) {
      setPassError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setPassSaving(false)
    }
  }

  const tabs = [
    { id: 'account', label: 'Account', icon: IconUser },
    { id: 'security', label: 'Security', icon: IconLock },
    { id: 'notifications', label: 'Notifications', icon: IconBell },
  ] as const

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <div className="bg-[#14202B] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-8">
            <button onClick={() => navigate('home')} className="text-white/50 hover:text-[#C89249] transition-colors">Home</button>
            <span className="text-white/25">/</span>
            <span className="text-[#C89249]">Settings</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Settings</h1>
          <div className="gold-divider" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#14202B]/8 rounded-2xl p-3 shadow-sm">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#14202B] text-white shadow-sm'
                      : 'text-[#20262E]/60 hover:bg-[#F8F6F2] hover:text-[#14202B]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
              <div className="my-2 border-t border-[#14202B]/8" />
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
              >
                <IconLogout className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {saved && (
              <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-3 flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-400 text-sm font-semibold">Changes saved successfully!</p>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="bg-white border border-[#14202B]/8 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-extrabold text-[#14202B] mb-6">Account Settings</h2>
                <div className="space-y-5">
                  <div>
                    <label className="text-[#20262E]/60 text-xs font-bold uppercase tracking-wide block mb-2">Full Name</label>
                    <input value={accountForm.name} onChange={e => setAccountForm({ ...accountForm, name: e.target.value })} className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] bg-[#F8F6F2]" />
                  </div>
                  <div>
                    <label className="text-[#20262E]/60 text-xs font-bold uppercase tracking-wide block mb-2">Email Address</label>
                    <input type="email" value={accountForm.email} disabled className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B]/50 bg-[#F8F6F2]/60 cursor-not-allowed" />
                    <p className="text-[#20262E]/40 text-xs mt-1.5">Email can't be changed here.</p>
                  </div>
                  <div>
                    <label className="text-[#20262E]/60 text-xs font-bold uppercase tracking-wide block mb-2">Phone Number</label>
                    <input value={accountForm.phone} onChange={e => setAccountForm({ ...accountForm, phone: e.target.value })} placeholder="+971 50 000 0000" className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] bg-[#F8F6F2]" />
                  </div>
                  {accountError && <p className="text-red-500 text-sm font-semibold">{accountError}</p>}
                  <button onClick={handleSaveAccount} disabled={accountSaving} className="bg-[#C89249] hover:bg-[#E0B368] disabled:opacity-60 text-[#14202B] font-bold px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C89249]/20">
                    {accountSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white border border-[#14202B]/8 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-extrabold text-[#14202B] mb-6">Security Settings</h2>
                <h3 className="text-base font-bold text-[#14202B] mb-5">Change Password</h3>
                <div className="space-y-5">
                  <div>
                    <label className="text-[#20262E]/60 text-xs font-bold uppercase tracking-wide block mb-2">Current Password</label>
                    <input type="password" value={passForm.current} onChange={e => setPassForm({ ...passForm, current: e.target.value })} placeholder="••••••••" className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] bg-[#F8F6F2]" />
                  </div>
                  <div>
                    <label className="text-[#20262E]/60 text-xs font-bold uppercase tracking-wide block mb-2">New Password</label>
                    <input type="password" value={passForm.newPass} onChange={e => setPassForm({ ...passForm, newPass: e.target.value })} placeholder="Min. 8 characters" className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] bg-[#F8F6F2]" />
                  </div>
                  <div>
                    <label className="text-[#20262E]/60 text-xs font-bold uppercase tracking-wide block mb-2">Confirm New Password</label>
                    <input type="password" value={passForm.confirm} onChange={e => setPassForm({ ...passForm, confirm: e.target.value })} placeholder="Repeat new password" className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] bg-[#F8F6F2]" />
                  </div>
                  {passError && <p className="text-red-500 text-sm font-semibold">{passError}</p>}
                  <button onClick={handleSavePassword} disabled={passSaving} className="bg-[#C89249] hover:bg-[#E0B368] disabled:opacity-60 text-[#14202B] font-bold px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C89249]/20">
                    {passSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white border border-[#14202B]/8 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-extrabold text-[#14202B] mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'email' as const, title: 'Email Notifications', desc: 'Receive updates about your orders and inquiries via email.' },
                    { key: 'security' as const, title: 'Security Alerts', desc: 'Get notified about logins and security-related activities.' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-5 border border-[#14202B]/8 rounded-xl hover:border-[#C89249]/30 transition-colors">
                      <div>
                        <p className="text-[#14202B] font-semibold text-sm">{item.title}</p>
                        <p className="text-[#20262E]/50 text-xs mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${notifications[item.key] ? 'bg-[#C89249]' : 'bg-[#14202B]/20'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[item.key] ? 'translate-x-7' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
