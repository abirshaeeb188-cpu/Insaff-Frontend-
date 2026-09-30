import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { api, ApiError } from '../lib/api'
import { IconEmail, IconPhone, IconChat } from '../components/Icons'

export default function ContactPage() {
  const { navigate } = useApp()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.submitContactMessage(form)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center p-8 pt-32">
        <div className="bg-white border border-[#14202B]/8 rounded-2xl p-12 max-w-md w-full text-center shadow-lg">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-[#14202B] mb-3">Message Sent!</h2>
          <p className="text-[#20262E]/60 mb-8">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }} className="border border-[#14202B]/20 text-[#14202B] font-semibold px-6 py-2.5 rounded-xl transition-all hover:bg-[#14202B]/5">
              Send Another
            </button>
            <button onClick={() => navigate('home')} className="bg-[#C89249] text-[#14202B] font-bold px-6 py-2.5 rounded-xl">
              Go Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#14202B] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-4">Get In Touch</p>
          <h1 className="text-5xl font-extrabold text-white mb-4">Contact Us</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/55 text-lg max-w-xl mx-auto">We're here to help with your construction material requirements. Reach out and let's talk.</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#1C2C3A] border-b border-[#C89249]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('home')} className="text-white/50 hover:text-[#C89249] transition-colors">Home</button>
            <span className="text-white/25">/</span>
            <span className="text-[#C89249]">Contact</span>
          </div>
        </div>
      </div>

      <section className="bg-[#F8F6F2] section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-extrabold text-[#14202B] mb-3">Insaf Sand Trading Company LLC SPC</h2>
              <div className="gold-divider mb-8" />
              <p className="text-[#20262E]/65 leading-relaxed mb-10">
                Ready to discuss your construction material requirements? Contact us through any of the channels below and our team will respond promptly.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: IconEmail, label: 'Email Us', value: 'dinsahibkhan191@gmail.com', href: 'mailto:dinsahibkhan191@gmail.com', color: '#C89249' },
                  { icon: IconPhone, label: 'Call Us', value: '+971 50 983 8681', href: 'tel:+971509838681', color: '#C89249' },
                  { icon: IconChat, label: 'WhatsApp', value: '+971 56 630 0173', href: 'https://wa.me/971566300173', color: '#25D366' },
                ].map(c => (
                  <a key={c.label} href={c.href} className="flex items-center gap-5 p-5 bg-white border border-[#14202B]/8 hover:border-[#C89249]/30 rounded-2xl transition-all card-hover shadow-sm group">
                    <div className="w-12 h-12 bg-[#14202B]/5 group-hover:bg-[#C89249]/10 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                      <c.icon className="w-5 h-5" style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-[#20262E]/50 text-xs font-semibold uppercase tracking-wide mb-0.5">{c.label}</p>
                      <p className="text-[#14202B] font-bold">{c.value}</p>
                    </div>
                    <svg className="w-4 h-4 text-[#C89249] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ))}
              </div>

              <div className="bg-[#14202B] border border-[#C89249]/20 rounded-2xl p-6">
                <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-4">Business Hours</p>
                <div className="space-y-2">
                  {[
                    { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                    { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map(h => (
                    <div key={h.day} className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">{h.day}</span>
                      <span className="text-white text-sm font-semibold">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white border border-[#14202B]/8 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-extrabold text-[#14202B] mb-2">Send a Message</h3>
              <p className="text-[#20262E]/55 text-sm mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-500 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[#14202B] text-sm font-semibold block mb-2">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Ahmed Al Rashid"
                      className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] placeholder-[#20262E]/30 bg-[#F8F6F2]"
                    />
                  </div>
                  <div>
                    <label className="text-[#14202B] text-sm font-semibold block mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="ahmed@company.ae"
                      className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] placeholder-[#20262E]/30 bg-[#F8F6F2]"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[#14202B] text-sm font-semibold block mb-2">Phone</label>
                    <input
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+971 50 000 0000"
                      className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] placeholder-[#20262E]/30 bg-[#F8F6F2]"
                    />
                  </div>
                  <div>
                    <label className="text-[#14202B] text-sm font-semibold block mb-2">Subject *</label>
                    <input
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="Material requirement inquiry"
                      className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] placeholder-[#20262E]/30 bg-[#F8F6F2]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#14202B] text-sm font-semibold block mb-2">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project and material requirements..."
                    rows={5}
                    className="w-full border border-[#14202B]/15 rounded-xl px-4 py-3 text-sm text-[#14202B] placeholder-[#20262E]/30 bg-[#F8F6F2] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C89249] hover:bg-[#E0B368] disabled:opacity-60 text-[#14202B] font-bold py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C89249]/25 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#14202B]/30 border-t-[#14202B] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
