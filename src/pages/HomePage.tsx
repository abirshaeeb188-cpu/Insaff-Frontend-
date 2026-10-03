import { useApp } from '../context/AppContext'
import { IconShieldCheck, IconTruck, IconTag, IconUsers } from '../components/Icons'
import heroSand from '../imports/IMG-20260924-WA0018.jpg'
import aboutImg from '../imports/IMG-20260924-WA0025.jpg'
import gravelImg from '../imports/IMG-20260924-WA0014.jpg'
import sandImg from '../imports/IMG-20260924-WA0019.jpg'
import blockImg from '../imports/IMG-20260924-WA0023.jpg'

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '500+', label: 'Projects Supplied' },
  { value: '50+', label: 'Heavy Fleet Vehicles' },
  { value: '24/7', label: 'Support & Dispatch' },
]

const highlights = [
  { img: gravelImg, title: 'Sand & Gravel', desc: 'Multiple grades of sand and crushed aggregate, quality-tested for every application.' },
  { img: sandImg, title: 'Cement Supply', desc: 'Certified Portland cement sourced from trusted manufacturers, delivered on schedule.' },
  { img: blockImg, title: 'Blocks & Pavers', desc: 'Solid concrete blocks and interlocking pavers, ready for bulk dispatch.' },
]

const whyUs = [
  { icon: IconShieldCheck, title: 'Quality Assured', desc: 'Every batch is tested for compliance before it leaves our yard.' },
  { icon: IconTruck, title: 'Reliable Delivery', desc: 'A dedicated heavy-duty fleet keeps your project on schedule.' },
  { icon: IconTag, title: 'Competitive Pricing', desc: 'Bulk rates and flexible payment terms for projects of any size.' },
  { icon: IconUsers, title: 'Trusted Partner', desc: 'Long-term supply relationships with contractors across the UAE.' },
]

export default function HomePage() {
  const { navigate } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[600px] sm:min-h-[640px] pt-28 pb-16 sm:py-24 flex items-center overflow-hidden">
        <img src={heroSand} alt="Sand and aggregate quarry" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14202B]/95 via-[#14202B]/80 to-[#14202B]/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-4">Insaf Sand Trading Company LLC SPC</p>
            <h1 className="text-[2rem] min-[400px]:text-4xl sm:text-6xl [@media(max-height:480px)]:!text-3xl font-extrabold text-white leading-tight mb-6">
              Reliable Sand & <span className="text-gold-gradient">Construction Material</span> Supply
            </h1>
            <div className="gold-divider mb-6" />
            <p className="text-white/60 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              Sourcing and delivering premium sand, gravel, aggregate, cement and blocks for construction and infrastructure projects across the UAE.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button onClick={() => navigate('register')} className="bg-[#C89249] hover:bg-[#E0B368] text-[#14202B] font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C89249]/25">
                Let's Start
              </button>
              <button onClick={() => navigate('services')} className="border border-white/25 hover:border-white text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all">
                Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1C2C3A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C89249] mb-1">{s.value}</p>
              <p className="text-white/55 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Snapshot */}
      <section className="bg-[#F8F6F2] section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-[#C89249]/10 rounded-3xl" />
            <img src={aboutImg} alt="Aggregate stockpile" className="relative w-full h-64 sm:h-96 object-cover rounded-2xl shadow-xl" />
          </div>
          <div>
            <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-3">Who We Are</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14202B] mb-4">Your Trusted Material Supply Partner</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#20262E]/65 leading-relaxed mb-6">
              Insaf Sand Trading Company LLC SPC supplies quality-tested sand, gravel, aggregate, cement and concrete blocks to contractors and infrastructure projects across the UAE. From single-load orders to long-term project contracts, we deliver reliably and on schedule.
            </p>
            <button onClick={() => navigate('about')} className="text-[#C89249] font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
              Learn More About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-3">What We Supply</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14202B]">Core Materials</h2>
            <div className="gold-divider mx-auto mt-6" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map(h => (
              <div key={h.title} className="group rounded-2xl overflow-hidden shadow-sm border border-[#14202B]/5 hover:shadow-xl transition-all">
                <div className="h-56 overflow-hidden">
                  <img src={h.img} alt={h.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#14202B] text-lg mb-2">{h.title}</h3>
                  <p className="text-[#20262E]/60 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate('services')} className="bg-[#14202B] hover:bg-[#1C2C3A] text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5">
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#14202B] section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Built On Reliability</h2>
            <div className="gold-divider mx-auto mt-6" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(w => (
              <div key={w.title} className="bg-[#1C2C3A] border border-[#C89249]/15 rounded-2xl p-6 text-center hover:border-[#C89249]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#C89249]/15 flex items-center justify-center mx-auto mb-4">
                  <w.icon className="w-6 h-6 text-[#C89249]" />
                </div>
                <h3 className="font-bold text-white mb-2">{w.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8F6F2] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-[#14202B] mb-4">Need Materials For Your Project?</h2>
          <p className="text-[#20262E]/60 mb-8">Get a detailed quote from our team, tailored to your quantity, grade and delivery schedule.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('register')} className="bg-[#C89249] hover:bg-[#E0B368] text-[#14202B] font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5">
              Let's Start
            </button>
            <button onClick={() => navigate('contact')} className="border border-[#14202B]/20 hover:border-[#14202B] text-[#14202B] font-semibold px-8 py-4 rounded-xl transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
