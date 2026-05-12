'use client'
import { useState, useEffect } from 'react'
import type { Comment } from '@/lib/store'

export default function LikesComments({ videoId }: { videoId: string }) {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/likes?videoId=${videoId}`)
      .then(r => r.json())
      .then(d => setLikes(d.likes))

    fetch(`/api/comments?videoId=${videoId}`)
      .then(r => r.json())
      .then(d => setComments(d))
  }, [videoId])

  async function handleLike() {
    if (liked) return
    setLiked(true)
    const res = await fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId }),
    })
    const d = await res.json()
    setLikes(d.likes)
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!author.trim() || !text.trim()) {
      setError('Merci de renseigner ton nom et ton commentaire.')
      return
    }
    setSubmitting(true)
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, author: author.trim(), text: text.trim() }),
    })
    const comment = await res.json()
    setComments(prev => [comment, ...prev])
    setText('')
    setSubmitting(false)
  }

  return (
    <div className="mt-8 space-y-8">
      {/* Like button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={liked}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 ${
            liked
              ? 'bg-accent text-bg border-accent cursor-default'
              : 'border-border text-muted hover:border-accent hover:text-accent'
          }`}
        >
          <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {liked ? 'Aimé !' : "J'aime"}
        </button>
        <span className="text-muted text-sm">{likes} {likes === 1 ? 'like' : 'likes'}</span>
      </div>

      {/* Comments */}
      <div>
        <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}>
          Commentaires <span className="text-muted text-base font-sans">({comments.length})</span>
        </h3>

        {/* Form */}
        <form onSubmit={handleComment} className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Ton prénom"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            maxLength={40}
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
          <textarea
            placeholder="Laisse un commentaire…"
            value={text}
            onChange={e => setText(e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
          />
          {error && <p className="text-pop text-xs">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-accent text-bg text-sm font-medium rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Envoi…' : 'Publier'}
          </button>
        </form>

        {/* List */}
        {comments.length === 0 ? (
          <p className="text-muted text-sm py-4 text-center">Sois le premier à commenter !</p>
        ) : (
          <ul className="space-y-4">
            {comments.map(c => (
              <li key={c.id} className="bg-surface border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold text-accent uppercase">
                    {c.author[0]}
                  </span>
                  <span className="font-medium text-sm">{c.author}</span>
                  <span className="text-muted text-xs ml-auto">
                    {new Date(c.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <p className="text-sm text-text/80 leading-relaxed">{c.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
