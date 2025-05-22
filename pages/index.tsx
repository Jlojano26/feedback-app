import React, { useState, useEffect } from 'react'

type Feedback = {
  id: string
  name: string
  message: string
  createdAt: string
}

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchFeedback() {
    const res = await fetch('/api/feedback')
    const data = await res.json()
    setFeedbacks(data)
  }

  useEffect(() => {
    fetchFeedback()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !message.trim()) {
      setError('Please enter both name and message.')
      return
    }
    setLoading(true)
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    })
    setLoading(false)
    if (res.ok) {
      setName('')
      setMessage('')
      fetchFeedback()
    } else {
      const err = await res.json()
      setError(err.error || 'Something went wrong.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 flex flex-col items-center font-sans">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg max-w-3xl w-full p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-wide">
          Feedback App
        </h1>

        <form onSubmit={handleSubmit} className="mb-10 space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <textarea
            placeholder="Your feedback"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition resize-none"
          />
          {error && <p className="text-red-600 font-semibold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-pink-400 pb-2">
            All Feedback
          </h2>

          {feedbacks.length === 0 && (
            <p className="text-gray-700 italic">No feedback yet. Be the first!</p>
          )}

          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {feedbacks.map(fb => (
              <li
                key={fb.id}
                className="p-4 bg-pink-50 rounded-lg shadow-sm border border-pink-200"
              >
                <p className="font-semibold text-pink-700">{fb.name} says:</p>
                <p className="mt-1 text-gray-800">{fb.message}</p>
                <p className="mt-2 text-xs text-gray-500">
                  {new Date(fb.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
