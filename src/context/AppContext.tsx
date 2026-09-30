import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api, ApiError, ApiUser, getAuthToken, setAuthToken } from '../lib/api'

export type Page =
  | 'home' | 'about' | 'services' | 'reviews' | 'contact'
  | 'register' | 'login' | 'verify-email' | 'forgot-password' | 'reset-password'
  | 'profile' | 'settings' | 'privacy-policy' | 'terms'

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  isVerified?: boolean
  avatar?: string
}

function mapUser(u: ApiUser): User {
  return {
    id: u.id,
    name: u.fullName,
    email: u.email,
    phone: u.phone ?? undefined,
    company: u.company ?? undefined,
    isVerified: u.isVerified,
  }
}

interface AppContextType {
  currentPage: Page
  navigate: (page: Page) => void
  user: User | null
  setUser: (user: User | null) => void
  authLoading: boolean

  // Shared between the auth pages so a page refresh / redirect doesn't lose the email
  pendingVerificationEmail: string | null
  setPendingVerificationEmail: (email: string | null) => void
  pendingResetEmail: string | null
  setPendingResetEmail: (email: string | null) => void

  register: (payload: { fullName: string; email: string; phone?: string; company?: string; password: string }) => Promise<void>
  verifyEmail: (email: string, code: string) => Promise<void>
  resendVerification: (email: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>
  updateProfile: (payload: { fullName?: string; phone?: string; company?: string }) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  logout: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null)
  const [pendingResetEmail, setPendingResetEmail] = useState<string | null>(null)

  const navigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // On first load, if a token was saved from a previous session, restore the user session.
  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      setAuthLoading(false)
      return
    }
    api.getMe()
      .then(({ user }) => setUser(mapUser(user)))
      .catch(() => setAuthToken(null))
      .finally(() => setAuthLoading(false))
  }, [])

  const register: AppContextType['register'] = async (payload) => {
    const { email } = await api.register(payload)
    setPendingVerificationEmail(email)
  }

  const verifyEmail: AppContextType['verifyEmail'] = async (email, code) => {
    const { token, user } = await api.verifyEmail(email, code)
    setAuthToken(token)
    setUser(mapUser(user))
    setPendingVerificationEmail(null)
  }

  const resendVerification: AppContextType['resendVerification'] = async (email) => {
    await api.resendVerification(email)
  }

  const login: AppContextType['login'] = async (email, password) => {
    const { token, user } = await api.login(email, password)
    setAuthToken(token)
    setUser(mapUser(user))
  }

  const forgotPassword: AppContextType['forgotPassword'] = async (email) => {
    await api.forgotPassword(email)
    setPendingResetEmail(email)
  }

  const resetPassword: AppContextType['resetPassword'] = async (email, code, newPassword) => {
    await api.resetPassword(email, code, newPassword)
    setPendingResetEmail(null)
  }

  const updateProfile: AppContextType['updateProfile'] = async (payload) => {
    const { user } = await api.updateProfile(payload)
    setUser(mapUser(user))
  }

  const changePassword: AppContextType['changePassword'] = async (currentPassword, newPassword) => {
    await api.changePassword(currentPassword, newPassword)
  }

  const logout = () => {
    setAuthToken(null)
    setUser(null)
    navigate('home')
  }

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigate,
        user,
        setUser,
        authLoading,
        pendingVerificationEmail,
        setPendingVerificationEmail,
        pendingResetEmail,
        setPendingResetEmail,
        register,
        verifyEmail,
        resendVerification,
        login,
        forgotPassword,
        resetPassword,
        updateProfile,
        changePassword,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

// Re-exported so pages can narrow error types without importing from lib/api directly.
export { ApiError }
