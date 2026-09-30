import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ReviewsPage from './pages/ReviewsPage'
import ContactPage from './pages/ContactPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'

const AUTH_PAGES = ['register', 'login', 'verify-email', 'forgot-password', 'reset-password']

function AppContent() {
  const { currentPage } = useApp()
  const isAuthPage = AUTH_PAGES.includes(currentPage)

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />
      case 'about': return <AboutPage />
      case 'services': return <ServicesPage />
      case 'reviews': return <ReviewsPage />
      case 'contact': return <ContactPage />
      case 'register': return <RegisterPage />
      case 'login': return <LoginPage />
      case 'verify-email': return <EmailVerificationPage />
      case 'forgot-password': return <ForgotPasswordPage />
      case 'reset-password': return <ResetPasswordPage />
      case 'profile': return <ProfilePage />
      case 'settings': return <SettingsPage />
      case 'privacy-policy': return <PrivacyPolicyPage />
      case 'terms': return <TermsPage />
      default: return <HomePage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <FloatingButtons />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
