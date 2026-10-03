import { useState, useEffect, useRef } from 'react'
import { useApp, Page } from '../context/AppContext'
import { IconUser, IconSettings, IconLogout } from './Icons'
import logoImg from '../imports/logo.png'

const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Reviews', page: 'reviews' },
  { label: 'Contact', page: 'contact' },
]

export default function Navbar() {
  const { currentPage, navigate, user, logout } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    document.body.classList.toggle('menu-open', mobileOpen)
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [mobileOpen])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const isHeroPage = ['home', 'about', 'services'].includes(currentPage)
  const navBg = scrolled || !isHeroPage
    ? 'bg-[#14202B]/95 backdrop-blur-md border-b border-[#C89249]/20 shadow-lg shadow-black/20'
    : 'bg-transparent'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => navigate('home')} className="flex-shrink-0">
              <img src={logoImg} alt="INSAF Sand Trading Company LLC SPC" className="h-14 w-auto rounded-full object-contain shadow-md" />
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-200 relative group ${
                    currentPage === page ? 'text-[#C89249]' : 'text-white/90 hover:text-[#C89249]'
                  }`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C89249] transition-all duration-300 ${
                    currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-2 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#C89249] flex items-center justify-center overflow-hidden flex-shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[#14202B] text-sm font-bold">{user.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <span className="text-white text-sm font-semibold">{user.name.split(' ')[0]}</span>
                    <svg className={`w-4 h-4 text-white/70 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-[#1C2C3A] border border-[#C89249]/25 rounded-2xl shadow-2xl dropdown-enter overflow-hidden">
                      <div className="px-4 py-4 border-b border-[#C89249]/15">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#C89249] flex items-center justify-center flex-shrink-0">
                            <span className="text-[#14202B] font-bold">{user.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{user.name}</p>
                            <p className="text-white/50 text-xs truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <DropdownItem icon={IconUser} label="Profile" onClick={() => { setDropdownOpen(false); navigate('profile') }} />
                        <DropdownItem icon={IconSettings} label="Settings" onClick={() => { setDropdownOpen(false); navigate('settings') }} />
                      </div>
                      <div className="border-t border-[#C89249]/15 py-2">
                        <DropdownItem icon={IconLogout} label="Logout" onClick={() => { setDropdownOpen(false); setLogoutModal(true) }} danger />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate('register')}
                  className="bg-[#C89249] hover:bg-[#E0B368] text-[#14202B] font-bold text-sm px-6 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-[#C89249]/25 hover:shadow-[#C89249]/40"
                >
                  Create Account
                </button>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#14202B] border-t border-[#C89249]/20 h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
            <div className="px-4 py-4 pb-8 space-y-1">
              {navLinks.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => { navigate(page); setMobileOpen(false) }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-[#C89249]/15 text-[#C89249]'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/10">
                {user ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-[#C89249] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14202B] font-bold text-sm">{user.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{user.name}</p>
                        <p className="text-white/50 text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={() => { navigate('profile'); setMobileOpen(false) }} className="w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl text-sm text-white/80 hover:bg-white/5"><IconUser className="w-4 h-4" /> Profile</button>
                    <button onClick={() => { navigate('settings'); setMobileOpen(false) }} className="w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl text-sm text-white/80 hover:bg-white/5"><IconSettings className="w-4 h-4" /> Settings</button>
                    <button onClick={() => { setMobileOpen(false); setLogoutModal(true) }} className="w-full flex items-center gap-3 text-left px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10"><IconLogout className="w-4 h-4" /> Logout</button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => { navigate('register'); setMobileOpen(false) }}
                      className="w-full bg-[#C89249] text-[#14202B] font-bold py-3 rounded-xl text-sm"
                    >
                      Create Account
                    </button>
                    <button
                      onClick={() => { navigate('login'); setMobileOpen(false) }}
                      className="w-full text-center text-white/70 text-sm py-2"
                    >
                      Already have an account? <span className="text-[#C89249] font-semibold">Login</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu backdrop: covers page + floating buttons, tap to close */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[45] bg-black/60"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Logout Confirmation Modal */}
      {logoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLogoutModal(false)} />
          <div className="relative bg-[#1C2C3A] border border-[#C89249]/25 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Confirm Logout</h3>
              <p className="text-white/60 text-sm mb-6">Are you sure you want to logout from your account?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setLogoutModal(false)}
                  className="flex-1 border border-white/20 text-white/80 hover:bg-white/10 py-2.5 rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setLogoutModal(false); logout() }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function DropdownItem({ icon: Icon, label, onClick, danger = false }: {
  icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void; danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
        danger
          ? 'text-red-400 hover:bg-red-500/10'
          : 'text-white/80 hover:bg-[#C89249]/10 hover:text-[#C89249]'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}
