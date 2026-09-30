import { useApp } from '../context/AppContext'

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly to us, such as your name, email address, phone number, company name and project details, when you request a quote, contact us, or create an account on our website.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use the information we collect to respond to quote requests and enquiries, process orders, coordinate deliveries, communicate with you about your account or orders, and improve our services.',
  },
  {
    title: '3. Sharing Of Information',
    body: 'We do not sell your personal information. We may share information with delivery partners, logistics providers, and service providers who assist us in operating our business, subject to confidentiality obligations.',
  },
  {
    title: '4. Data Security',
    body: 'We implement reasonable administrative, technical and physical safeguards designed to protect your information from unauthorized access, disclosure, alteration or destruction.',
  },
  {
    title: '5. Cookies',
    body: 'Our website may use cookies and similar technologies to improve your browsing experience and understand how visitors use our site.',
  },
  {
    title: '6. Your Rights',
    body: 'You may request access to, correction of, or deletion of your personal information by contacting us using the details on our Contact page.',
  },
  {
    title: '7. Changes To This Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.',
  },
  {
    title: '8. Contact Us',
    body: 'If you have any questions about this Privacy Policy, please contact us at dinsahibkhan191@gmail.com or +971 50 983 8681.',
  },
]

export default function PrivacyPolicyPage() {
  const { navigate } = useApp()

  return (
    <div className="min-h-screen">
      <section className="bg-[#14202B] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/50 text-sm">Last updated: September 2026</p>
        </div>
      </section>

      <div className="bg-[#1C2C3A] border-b border-[#C89249]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('home')} className="text-white/50 hover:text-[#C89249] transition-colors">Home</button>
            <span className="text-white/25">/</span>
            <span className="text-[#C89249]">Privacy Policy</span>
          </div>
        </div>
      </div>

      <section className="bg-[#F8F6F2] section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#14202B]/8 rounded-2xl p-8 sm:p-12 shadow-sm space-y-10">
            <p className="text-[#20262E]/65 leading-relaxed">
              Insaf Sand Trading Company LLC SPC ("we", "our", "us") respects your privacy. This Privacy Policy explains how we collect, use and protect your information when you visit our website or use our services.
            </p>
            {sections.map(s => (
              <div key={s.title}>
                <h2 className="text-xl font-extrabold text-[#14202B] mb-3">{s.title}</h2>
                <p className="text-[#20262E]/65 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
