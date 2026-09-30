import { useApp } from '../context/AppContext'
import { IconTarget, IconEye, IconStar } from '../components/Icons'
import aboutHero from '../imports/IMG-20260924-WA0022.jpg'
import storyImg from '../imports/IMG-20260924-WA0020.jpg'
import blockImg from '../imports/IMG-20260924-WA0028.jpg'

const values = [
  { icon: IconTarget, title: 'Our Mission', desc: 'To be the most reliable construction material supplier in the UAE, delivering quality products on time, every time.' },
  { icon: IconEye, title: 'Our Vision', desc: 'To grow as the region\'s preferred partner for sand, aggregate and building material supply through consistency and trust.' },
  { icon: IconStar, title: 'Our Values', desc: 'Quality, integrity, and reliability guide every load we deliver and every relationship we build.' },
]

const timeline = [
  { year: 'Founded', text: 'Insaf Sand Trading Company LLC SPC established to serve the UAE construction sector.' },
  { year: 'Growth', text: 'Expanded our fleet and storage yard to support bulk and project-scale supply.' },
  { year: 'Today', text: 'Trusted by contractors for sand, gravel, cement and block supply across multiple emirates.' },
]

export default function AboutPage() {
  const { navigate } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[420px] flex items-center justify-center overflow-hidden">
        <img src={aboutHero} alt="Aggregate storage yard" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#14202B]/85 via-[#14202B]/75 to-[#14202B]" />
        <div className="relative text-center">
          <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-4">Get To Know Us</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4">About Us</h1>
          <div className="gold-divider mx-auto" />
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#14202B] border-b border-[#C89249]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('home')} className="text-white/50 hover:text-[#C89249] transition-colors">Home</button>
            <span className="text-white/25">/</span>
            <span className="text-[#C89249]">About</span>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="bg-[#F8F6F2] section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-[#C89249]/10 rounded-3xl" />
            <img src={storyImg} alt="Quarry operations" className="relative w-full h-96 object-cover rounded-2xl shadow-xl" />
          </div>
          <div>
            <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-3">Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14202B] mb-4">Building The UAE, One Delivery At A Time</h2>
            <div className="gold-divider mb-6" />
            <p className="text-[#20262E]/65 leading-relaxed mb-4">
              Insaf Sand Trading Company LLC SPC supplies premium quality sand, gravel, aggregate, cement and concrete blocks to construction and infrastructure projects across the UAE.
            </p>
            <p className="text-[#20262E]/65 leading-relaxed">
              We work directly with quarries and manufacturers to source quality-tested materials, and operate our own fleet to guarantee on-time, bulk-scale delivery — whether it's a single load or a long-term project contract.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-[#F8F6F2] border border-[#14202B]/8 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-[#C89249]/15 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-[#C89249]" />
                </div>
                <h3 className="font-bold text-[#14202B] text-lg mb-3">{v.title}</h3>
                <p className="text-[#20262E]/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline + Image */}
      <section className="bg-[#F8F6F2] section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-3">Our Journey</p>
            <h2 className="text-3xl font-extrabold text-[#14202B] mb-6">How We Got Here</h2>
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-[#C89249]/15 flex items-center justify-center text-[#C89249] font-bold flex-shrink-0">{i + 1}</div>
                  <div>
                    <p className="font-bold text-[#14202B] mb-1">{t.year}</p>
                    <p className="text-[#20262E]/60 text-sm leading-relaxed">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-[#C89249]/10 rounded-3xl" />
            <img src={blockImg} alt="Concrete blocks ready for delivery" className="relative w-full h-96 object-cover rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#14202B] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Let's Work Together</h2>
          <p className="text-white/55 mb-8">Reach out to discuss your material needs and become one of our trusted partners.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('register')} className="bg-[#C89249] hover:bg-[#E0B368] text-[#14202B] font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5">
              Let's Start
            </button>
            <button onClick={() => navigate('contact')} className="border border-white/20 hover:border-white text-white font-semibold px-8 py-4 rounded-xl transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
