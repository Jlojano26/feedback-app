import React, { useEffect, useState } from 'react'

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
    <div
      className="min-h-screen bg-blue-100 bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="backdrop-blur-sm bg-blue-100/80 shadow-xl rounded-xl max-w-3xl w-full p-8 m-4">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6 border-2 border-blue-700 rounded-md p-2">
          Feedback App
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            placeholder="Your feedback"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-600 resize-none"
          />
          {error && <p className="text-red-600 font-semibold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 border-2 border-blue-800 rounded-md p-2">
            All Feedback
          </h2>
          {feedbacks.length === 0 && (
            <p className="text-blue-600 italic">No feedback yet. Be the first!</p>
          )}
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {feedbacks.map(fb => (
              <li
                key={fb.id}
                className="bg-blue-800 border border-blue-300 p-4 rounded-lg shadow-md text-white"
              >
                <p className="font-semibold text-white">{fb.name} says:</p>
                <p className="text-blue-100">{fb.message}</p>
                <p className="text-xs text-blue-200 mt-1">
                  {new Date(fb.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
