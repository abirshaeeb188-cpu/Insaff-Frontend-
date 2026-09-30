import { useApp } from '../context/AppContext'

const sections = [
  {
    title: '1. Acceptance Of Terms',
    body: 'By accessing or using this website, or by placing an order with Insaf Sand Trading Company LLC SPC, you agree to be bound by these Terms & Conditions.',
  },
  {
    title: '2. Products & Quotations',
    body: 'All quotations provided are estimates based on the information supplied and are subject to confirmation of material availability, grade, quantity and delivery location at the time of order.',
  },
  {
    title: '3. Orders & Payment',
    body: 'Orders are confirmed upon receipt of agreed payment terms. Payment methods and schedules will be communicated at the time of quotation and may vary by project scale.',
  },
  {
    title: '4. Delivery',
    body: 'Delivery timelines are estimates and may be affected by site access, weather conditions, or circumstances beyond our reasonable control. We will make reasonable efforts to meet agreed schedules.',
  },
  {
    title: '5. Material Quality',
    body: 'We supply quality-tested materials sourced from approved quarries and manufacturers. Any quality concerns must be reported within a reasonable time of delivery for review.',
  },
  {
    title: '6. Cancellations & Returns',
    body: 'Cancellations of confirmed orders may be subject to applicable charges depending on the stage of order processing or dispatch.',
  },
  {
    title: '7. Limitation Of Liability',
    body: 'Insaf Sand Trading Company LLC SPC shall not be liable for indirect or consequential losses arising from delays or issues outside of our direct control.',
  },
  {
    title: '8. Governing Law',
    body: 'These Terms & Conditions are governed by the laws of the United Arab Emirates.',
  },
  {
    title: '9. Contact Us',
    body: 'For questions regarding these Terms & Conditions, please contact us at dinsahibkhan191@gmail.com or +971 50 983 8681.',
  },
]

export default function TermsPage() {
  const { navigate } = useApp()

  return (
    <div className="min-h-screen">
      <section className="bg-[#14202B] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Terms & Conditions</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/50 text-sm">Last updated: September 2026</p>
        </div>
      </section>

      <div className="bg-[#1C2C3A] border-b border-[#C89249]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('home')} className="text-white/50 hover:text-[#C89249] transition-colors">Home</button>
            <span className="text-white/25">/</span>
            <span className="text-[#C89249]">Terms & Conditions</span>
          </div>
        </div>
      </div>

      <section className="bg-[#F8F6F2] section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#14202B]/8 rounded-2xl p-8 sm:p-12 shadow-sm space-y-10">
            <p className="text-[#20262E]/65 leading-relaxed">
              These Terms & Conditions govern your use of the Insaf Sand Trading Company LLC SPC website and the products and services we provide.
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
