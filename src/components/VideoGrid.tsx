'use client'
import { useState, useEffect, useCallback } from 'react'
import VideoCard from './VideoCard'
import { Video } from '@/lib/types'

const CATEGORIES = ['Tous', 'Son', 'Cadrage', 'Production', 'Drone']

export default function VideoGrid({ initial }: { initial: Video[] }) {
  const [videos, setVideos] = useState<Video[]>(initial)
  const [category, setCategory] = useState('Tous')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const fetch_videos = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (category !== 'Tous') params.set('category', category)
    if (query) params.set('q', query)
    const res = await fetch(`/api/videos?${params}`)
    const data = await res.json()
    setVideos(data)
    setLoading(false)
  }, [category, query])

  useEffect(() => {
    const t = setTimeout(fetch_videos, 200)
    return () => clearTimeout(t)
  }, [fetch_videos])

  return (
    <div>
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un tuto, auteur…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-full pl-9 pr-4 py-2 text-sm text-text placeholder-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
                category === cat
                  ? 'bg-accent text-bg border-accent'
                  : 'bg-transparent border-border text-muted hover:border-accent/40 hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl bg-card border border-border overflow-hidden animate-pulse">
              <div className="aspect-video bg-surface" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-surface rounded w-1/3" />
                <div className="h-5 bg-surface rounded w-4/5" />
                <div className="h-3 bg-surface rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-4xl mb-3">🎬</p>
          <p className="text-lg">Aucune vidéo trouvée</p>
          <p className="text-sm mt-1">Essaie un autre filtre ou mot-clé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
