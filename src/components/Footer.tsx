import { useApp, Page } from '../context/AppContext'
import logoImg from '../imports/logo.png'

const quickLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Reviews', page: 'reviews' },
  { label: 'Contact', page: 'contact' },
]

const serviceLinks = [
  'Sand Supply',
  'Gravel & Aggregate',
  'Construction Materials',
  'Bulk Delivery',
  'Project Material Supply',
  'Customized Solutions',
]

export default function Footer() {
  const { navigate } = useApp()

  return (
    <footer className="bg-[#14202B] pt-16 pb-8 border-t border-[#C89249]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-[#C89249]/15">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logoImg} alt="INSAF Sand Trading Company" className="h-16 w-auto rounded-full object-contain mb-5 shadow-md" />
            <p className="text-white/55 text-sm leading-relaxed">
              Premium construction material and sand supply company based in the UAE, serving infrastructure and construction projects with quality and reliability.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://wa.me/971566300173" className="w-9 h-9 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="tel:+971509838681" className="w-9 h-9 bg-[#C89249]/15 hover:bg-[#C89249]/25 border border-[#C89249]/30 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-[#C89249]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C89249] font-bold text-sm tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-white/55 hover:text-[#C89249] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-[#C89249]/40 group-hover:w-6 group-hover:bg-[#C89249] transition-all duration-200" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#C89249] font-bold text-sm tracking-widest uppercase mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(s => (
                <li key={s}>
                  <button
                    onClick={() => navigate('services')}
                    className="text-white/55 hover:text-[#C89249] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-[#C89249]/40 group-hover:w-6 group-hover:bg-[#C89249] transition-all duration-200" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C89249] font-bold text-sm tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#C89249]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#C89249]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Email</p>
                  <a href="mailto:dinsahibkhan191@gmail.com" className="text-white/70 hover:text-[#C89249] text-sm transition-colors break-all">dinsahibkhan191@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#C89249]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#C89249]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Phone</p>
                  <a href="tel:+971509838681" className="text-white/70 hover:text-[#C89249] text-sm transition-colors">+971 50 983 8681</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#25D366]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">WhatsApp</p>
                  <a href="https://wa.me/971566300173" className="text-white/70 hover:text-[#25D366] text-sm transition-colors">+971 56 630 0173</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-sm">
            © 2026 Insaf Sand Trading Company LLC SPC. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('privacy-policy')} className="text-white/40 hover:text-[#C89249] text-xs transition-colors">Privacy Policy</button>
            <span className="text-[#C89249]/30 text-xs">|</span>
            <button onClick={() => navigate('terms')} className="text-white/40 hover:text-[#C89249] text-xs transition-colors">Terms & Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
