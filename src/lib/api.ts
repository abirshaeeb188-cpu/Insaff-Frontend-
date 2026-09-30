// Thin, typed wrapper around the Insaf backend REST API.
// Base URL comes from VITE_API_URL (see .env / .env.example); falls back to localhost:5000.

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:5000/api'

const TOKEN_KEY = 'insaf_token'

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAuthToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // localStorage can throw in private-browsing/edge cases — safe to ignore
  }
}

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  let res: Response
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  } catch {
    throw new ApiError('Could not reach the server. Please check your connection and try again.', 0, null)
  }

  let data: unknown = null
  try {
    data = await res.json()
  } catch {
    // No JSON body (e.g. 204) — leave data as null
  }

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && 'error' in data && typeof (data as any).error === 'string'
        ? (data as any).error
        : null) || 'Something went wrong. Please try again.'
    throw new ApiError(message, res.status, data)
  }

  return data as T
}

// ---------- Types matching the backend's `publicUser` shape ----------

export interface ApiUser {
  id: number
  fullName: string
  email: string
  phone: string | null
  company: string | null
  isVerified: boolean
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: ApiUser
}

export interface ApiReview {
  id: number
  user_id: number
  rating: number
  title: string | null
  comment: string
  created_at: string
  reviewer_name: string
  reviewer_company: string | null
}

// ---------- Auth endpoints ----------

export const api = {
  register(payload: { fullName: string; email: string; phone?: string; company?: string; password: string }) {
    return request<{ message: string; email: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  verifyEmail(email: string, code: string) {
    return request<AuthResponse>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    })
  },

  resendVerification(email: string) {
    return request<{ message: string }>('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  login(email: string, password: string) {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  forgotPassword(email: string) {
    return request<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  resetPassword(email: string, code: string, newPassword: string) {
    return request<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, code, newPassword }),
    })
  },

  getMe() {
    return request<{ user: ApiUser }>('/auth/me')
  },

  updateProfile(payload: { fullName?: string; phone?: string; company?: string }) {
    return request<{ user: ApiUser }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },

  changePassword(currentPassword: string, newPassword: string) {
    return request<{ message: string }>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    })
  },

  // ---------- Reviews endpoints ----------

  listReviews() {
    return request<{ reviews: ApiReview[] }>('/reviews')
  },

  createReview(rating: number, comment: string, title?: string) {
    return request<{ review: ApiReview }>('/reviews', {
      method: 'POST',
      body: JSON.stringify({ rating, comment, title }),
    })
  },

  deleteReview(id: number) {
    return request<{ message: string }>(`/reviews/${id}`, { method: 'DELETE' })
  },

  // ---------- Contact form ----------

  submitContactMessage(payload: { name: string; email: string; phone?: string; subject: string; message: string }) {
    return request<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
