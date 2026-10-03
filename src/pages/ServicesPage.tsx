import { useApp } from '../context/AppContext'
import { IconSand, IconGravel, IconBlocks, IconCement, IconTruck, IconSettings } from '../components/Icons'
import img14 from '../imports/IMG-20260924-WA0014.jpg'
import img15 from '../imports/IMG-20260924-WA0015.jpg'
import img16 from '../imports/IMG-20260924-WA0016.jpg'
import img17 from '../imports/IMG-20260924-WA0017.jpg'
import img18 from '../imports/IMG-20260924-WA0018.jpg'
import img19 from '../imports/IMG-20260924-WA0019.jpg'
import img20 from '../imports/IMG-20260924-WA0020.jpg'
import img21 from '../imports/IMG-20260924-WA0021.jpg'
import img22 from '../imports/IMG-20260924-WA0022.jpg'
import img23 from '../imports/IMG-20260924-WA0023.jpg'
import img24 from '../imports/IMG-20260924-WA0024.jpg'
import img25 from '../imports/IMG-20260924-WA0025.jpg'
import img26 from '../imports/IMG-20260924-WA0026.jpg'
import img27 from '../imports/IMG-20260924-WA0027.jpg'
import img28 from '../imports/IMG-20260924-WA0028.jpg'

const heroImg = 'https://images.unsplash.com/photo-1782421932252-dbca02aae506?w=1800&h=600&fit=crop&auto=format'

// Top-line service categories (what we do)
const serviceCategories = [
  { icon: IconSand, title: 'Sand Supply', desc: 'Multiple sand grades for concrete, plastering & filling.' },
  { icon: IconGravel, title: 'Gravel & Aggregate', desc: 'Crushed aggregate from 10mm–75mm, tested for quality.' },
  { icon: IconBlocks, title: 'Blocks & Pavers', desc: 'Solid concrete blocks & interlocking pavers, bulk supply.' },
  { icon: IconCement, title: 'Cement Supply', desc: 'Portland cement (OPC) sourced from certified manufacturers.' },
  { icon: IconTruck, title: 'Bulk Delivery', desc: 'Heavy-duty fleet for high-volume, on-schedule delivery.' },
  { icon: IconSettings, title: 'Custom Solutions', desc: 'Mixed loads & bespoke supply programs for any project.' },
]

// Every material photo as its own product card (all 15 site images used)
const materials = [
  { img: img14, title: 'Crushed Aggregate', tag: 'Gravel', desc: 'Angular crushed grey aggregate, graded for concrete mixing and structural fill.' },
  { img: img15, title: 'Quarry Dust', tag: 'Aggregate', desc: 'Fine dark aggregate / crusher dust, ideal for base layers and compaction fill.' },
  { img: img16, title: 'Red Sand', tag: 'Sand', desc: 'Natural reddish sand suited for backfilling and general earthworks.' },
  { img: img17, title: 'Filling Sand', tag: 'Sand', desc: 'Coarse beige sand for site filling, levelling and general construction use.' },
  { img: img18, title: 'Quarry Sand & Rock Mix', tag: 'Sand', desc: 'Freshly quarried sand with natural rock content, sourced on-site.' },
  { img: img19, title: 'Washed Sand', tag: 'Sand', desc: 'Clean, screened sand suitable for plastering, grouting and concrete work.' },
  { img: img20, title: 'Screened Sand', tag: 'Sand', desc: 'Fine screened sand stockpiled at the quarry, ready for bulk loading.' },
  { img: img21, title: 'Interlocking Pavers', tag: 'Blocks', desc: 'Precast interlocking paver blocks, freshly cured and ready for dispatch.' },
  { img: img22, title: 'Graded Aggregate', tag: 'Gravel', desc: 'Uniformly graded grey aggregate stockpiled at our storage yard.' },
  { img: img23, title: 'Solid Concrete Blocks', tag: 'Blocks', desc: 'Strapped pallets of solid concrete masonry blocks, factory-fresh.' },
  { img: img24, title: 'Portland Cement (OPC 42.5)', tag: 'Cement', desc: 'RAKCC Portland cement, 50kg bags, ISO 9001:2015 certified quality.' },
  { img: img25, title: 'Bulk Aggregate Stockpile', tag: 'Gravel', desc: 'Large-volume aggregate reserves maintained for uninterrupted supply.' },
  { img: img26, title: 'Premium Crushed Stone', tag: 'Gravel', desc: 'Hand-tested crushed stone sample showing consistent size grading.' },
  { img: img27, title: 'Fine Crushed Aggregate', tag: 'Aggregate', desc: 'Finely crushed aggregate mix, suited for road base and drainage layers.' },
  { img: img28, title: 'SolidMix Concrete Blocks', tag: 'Blocks', desc: 'Branded SolidMix concrete blocks, strapped and palletized for delivery.' },
]

export default function ServicesPage() {
  const { navigate } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[420px] sm:min-h-[480px] pt-24 pb-12 flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Dump truck in desert landscape" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#14202B]/85 via-[#14202B]/75 to-[#14202B]" />
        <div className="relative text-center px-4">
          <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-4">What We Offer</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">Our Services</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">Comprehensive construction material supply solutions for every project scale.</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#14202B] border-b border-[#C89249]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('home')} className="text-white/50 hover:text-[#C89249] transition-colors">Home</button>
            <span className="text-white/25">/</span>
            <span className="text-[#C89249]">Services</span>
          </div>
        </div>
      </div>

      {/* Service Categories - small overview cards */}
      <section className="bg-[#F8F6F2] pt-20 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-3">Service Categories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14202B]">What We Supply</h2>
            <div className="gold-divider mx-auto mt-6" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-[#14202B]/5 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#C89249]/15 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-[#C89249]" />
                </div>
                <h3 className="font-bold text-[#14202B] mb-2">{s.title}</h3>
                <p className="text-[#20262E]/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Gallery - one card per photo (all 15 images) */}
      <section className="bg-[#F8F6F2] section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-3">From Our Yard</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14202B]">Our Materials</h2>
            <div className="gold-divider mx-auto mt-6" />
            <p className="text-[#20262E]/60 max-w-2xl mx-auto mt-4">Real stock, straight from our quarry and storage yard — available for bulk order.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.map((m, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#14202B]/5 hover:shadow-xl transition-all">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#14202B]/85 text-[#C89249] text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full">
                    {m.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#14202B] text-lg mb-2">{m.title}</h3>
                  <p className="text-[#20262E]/60 text-sm leading-relaxed mb-5">{m.desc}</p>
                  <a
                    href={`https://wa.me/971566300173?text=${encodeURIComponent(`Hi, I'm interested in getting a quote for ${m.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C89249] font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Request a Quote
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#14202B] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/55 mb-8">Contact our team today to discuss your material requirements and receive a detailed quote.</p>
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
