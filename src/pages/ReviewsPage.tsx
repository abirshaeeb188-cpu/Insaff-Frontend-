import { useState, useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { api, ApiError, ApiReview } from '../lib/api'
import { IconBadgeCheck } from '../components/Icons'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function StarRating({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          disabled={!interactive}
          onClick={() => onRate?.(i)}
          onMouseEnter={() => interactive && setHovered(i)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              i <= (interactive ? hovered || rating : rating) ? 'text-[#C89249]' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const { user, navigate } = useApp()
  const [reviews, setReviews] = useState<ApiReview[]>([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showAuthMessage, setShowAuthMessage] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const loadReviews = useCallback(async () => {
    setLoadingReviews(true)
    setLoadError('')
    try {
      const { reviews } = await api.listReviews()
      setReviews(reviews)
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : 'Could not load reviews right now.')
    } finally {
      setLoadingReviews(false)
    }
  }, [])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  const avgRating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0
  const distribution = [5, 4, 3, 2, 1].map(r => ({
    stars: r,
    count: reviews.filter(rv => rv.rating === r).length,
    pct: reviews.length ? (reviews.filter(rv => rv.rating === r).length / reviews.length) * 100 : 0,
  }))

  const handleWriteReview = () => {
    if (user) {
      setShowForm(true)
      setShowAuthMessage(false)
      setSubmitted(false)
    } else {
      setShowAuthMessage(true)
    }
  }

  const handleSubmit = async () => {
    if (!reviewText.trim()) return
    setSubmitError('')
    setSubmitting(true)
    try {
      await api.createReview(reviewRating, reviewText.trim(), reviewTitle.trim() || undefined)
      setSubmitted(true)
      setShowForm(false)
      setReviewRating(5)
      setReviewTitle('')
      setReviewText('')
      loadReviews()
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    try {
      await api.deleteReview(id)
      setReviews(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : 'Could not delete review right now.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2] pb-24 sm:pb-0">
      {/* Hero */}
      <section className="bg-[#14202B] pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2">
            <p className="text-[#C89249] text-xs font-bold tracking-widest uppercase mb-4">Testimonials</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Customer Reviews</h1>
            <div className="gold-divider mx-auto mb-8" />
            <p className="text-white/50 text-sm italic">Real reviews from verified customers</p>
          </div>

          {/* Rating Overview */}
          <div className="mt-12 bg-[#1C2C3A] border border-[#C89249]/20 rounded-2xl p-5 sm:p-8 max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <p className="text-[#C89249] text-6xl sm:text-7xl font-extrabold">{avgRating.toFixed(1)}</p>
                <div className="flex justify-center my-3">
                  <StarRating rating={Math.round(avgRating)} />
                </div>
                <p className="text-white/50 text-sm">{reviews.length} review{reviews.length === 1 ? '' : 's'}</p>
              </div>
              <div className="space-y-2">
                {distribution.map(d => (
                  <div key={d.stars} className="flex items-center gap-3">
                    <span className="text-white/60 text-xs w-4">{d.stars}</span>
                    <svg className="w-3 h-3 text-[#C89249] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 h-2 bg-[#14202B] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C89249] rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                    </div>
                    <span className="text-white/40 text-xs w-4">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#1C2C3A] border-b border-[#C89249]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('home')} className="text-white/50 hover:text-[#C89249] transition-colors">Home</button>
            <span className="text-white/25">/</span>
            <span className="text-[#C89249]">Reviews</span>
          </div>
          <button
            onClick={handleWriteReview}
            className="bg-[#C89249] hover:bg-[#E0B368] text-[#14202B] font-bold px-4 sm:px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-all"
          >
            Write a Review
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Success message */}
        {submitted && (
          <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
            <IconBadgeCheck className="w-10 h-10 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-bold">Thank you for your review!</p>
            <p className="text-green-400/70 text-sm mt-1">Your review has been posted.</p>
          </div>
        )}

        {/* Auth message */}
        {showAuthMessage && (
          <div className="mb-8 bg-[#1C2C3A] border border-[#C89249]/25 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#C89249]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#C89249]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-white font-bold text-lg mb-2">Login Required</p>
            <p className="text-white/55 text-sm mb-6">Please login or create an account to submit a review.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => navigate('login')} className="bg-[#C89249] hover:bg-[#E0B368] text-[#14202B] font-bold px-6 py-2.5 rounded-xl transition-all">
                Login
              </button>
              <button onClick={() => navigate('register')} className="border border-[#C89249]/40 hover:border-[#C89249] text-[#C89249] font-semibold px-6 py-2.5 rounded-xl transition-all">
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Review Form */}
        {showForm && (
          <div className="mb-12 bg-[#1C2C3A] border border-[#C89249]/25 rounded-2xl p-5 sm:p-8">
            <h3 className="text-white font-bold text-xl mb-6">Write Your Review</h3>
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
                {submitError}
              </div>
            )}
            <div className="mb-6">
              <label className="text-white/70 text-sm font-semibold block mb-3">Your Rating</label>
              <StarRating rating={reviewRating} interactive onRate={setReviewRating} />
            </div>
            <div className="mb-6">
              <label className="text-white/70 text-sm font-semibold block mb-3">Title (optional)</label>
              <input
                value={reviewTitle}
                onChange={e => setReviewTitle(e.target.value)}
                placeholder="Sum up your experience in a few words"
                className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="text-white/70 text-sm font-semibold block mb-3">Your Review</label>
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Share your experience with Insaf Sand Trading Company..."
                rows={4}
                className="w-full bg-[#14202B] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm resize-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleSubmit} disabled={submitting || !reviewText.trim()} className="bg-[#C89249] hover:bg-[#E0B368] disabled:opacity-60 text-[#14202B] font-bold px-8 py-3 rounded-xl transition-all">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button onClick={() => { setShowForm(false); setSubmitError('') }} className="border border-white/20 text-white/70 font-semibold px-6 py-3 rounded-xl transition-all hover:bg-white/5">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Loading / error states */}
        {loadingReviews && (
          <div className="text-center py-16 text-[#20262E]/50 text-sm">Loading reviews...</div>
        )}
        {!loadingReviews && loadError && (
          <div className="text-center py-12">
            <p className="text-red-500 text-sm font-semibold mb-4">{loadError}</p>
            <button onClick={loadReviews} className="text-[#C89249] font-semibold text-sm hover:underline">Try again</button>
          </div>
        )}
        {!loadingReviews && !loadError && reviews.length === 0 && (
          <div className="text-center py-16 text-[#20262E]/50 text-sm">
            No reviews yet — be the first to share your experience.
          </div>
        )}

        {/* Reviews Grid */}
        {!loadingReviews && !loadError && reviews.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white border border-[#14202B]/8 hover:border-[#C89249]/30 rounded-2xl p-6 card-hover shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#2C4356] rounded-full flex items-center justify-center text-white font-bold">
                      {r.reviewer_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[#14202B] font-bold text-sm">{r.reviewer_name}</p>
                      <p className="text-[#20262E]/50 text-xs">{r.reviewer_company || 'Customer'}</p>
                    </div>
                  </div>
                  {user && Number(user.id) === Number(r.user_id) && (
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deletingId === r.id}
                      className="text-red-400 hover:text-red-500 text-xs font-semibold disabled:opacity-50"
                    >
                      {deletingId === r.id ? 'Deleting...' : 'Delete'}
                    </button>
                  )}
                </div>
                <div className="mb-3">
                  <StarRating rating={r.rating} />
                </div>
                {r.title && <p className="text-[#14202B] font-bold text-sm mb-1">{r.title}</p>}
                <p className="text-[#20262E]/65 text-sm leading-relaxed mb-4 break-words">"{r.comment}"</p>
                <p className="text-[#20262E]/35 text-xs">{formatDate(r.created_at)}</p>
              </div>
            ))}
          </div>
        )}

        {/* Write review CTA at bottom */}
        {!showForm && !submitted && (
          <div className="mt-12 text-center">
            <p className="text-[#20262E]/50 text-sm mb-4">Have you worked with us? Share your experience.</p>
            <button
              onClick={handleWriteReview}
              className="bg-[#14202B] hover:bg-[#1C2C3A] text-white font-bold px-8 py-3.5 rounded-xl transition-all border border-[#C89249]/20 hover:border-[#C89249]/50"
            >
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
