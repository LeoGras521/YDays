import { notFound } from 'next/navigation'
import Link from 'next/link'
import videos from '@/lib/videos.json'
import { Video } from '@/lib/types'
import VideoPlayer from '@/components/VideoPlayer'
import LikesComments from '@/components/LikesComments'

export function generateStaticParams() {
  return (videos as Video[]).map(v => ({ id: v.id }))
}

export default function VideoPage({ params }: { params: { id: string } }) {
  const video = (videos as Video[]).find(v => v.id === params.id)
  if (!video) notFound()

  // Related videos (same category, excluding current)
  const related = (videos as Video[])
    .filter(v => v.category === video.category && v.id !== video.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md px-6 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </Link>
        <span className="text-border">|</span>
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="SoftBox" className="w-6 h-6" style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(30deg)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.05em' }}>
            Soft<span className="text-accent">Box</span>
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Category breadcrumb */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium uppercase tracking-widest text-accent/80 bg-accent/10 px-2 py-0.5 rounded-full">
            {video.category}
          </span>
          <span className="text-muted text-xs">{video.promo}</span>
        </div>

        {/* Title */}
        <h1
          className="mb-6 leading-none"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.02em' }}
        >
          {video.title}
        </h1>

        {/* Player */}
        <VideoPlayer video={video} />

        {/* Meta */}
        <div className="mt-6 flex flex-wrap items-center gap-4 pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-bold text-accent uppercase">
              {video.author[0]}
            </span>
            <div>
              <p className="text-sm font-medium">{video.author}</p>
              <p className="text-xs text-muted">{video.promo}</p>
            </div>
          </div>
          <span className="text-muted text-xs ml-auto">
            {new Date(video.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}{video.duration}
          </span>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="text-text/70 leading-relaxed">{video.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {video.tags.map(tag => (
              <span key={tag} className="text-xs bg-surface border border-border text-muted px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Likes & Comments */}
        <LikesComments videoId={video.id} />

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="mb-5 text-muted text-xs uppercase tracking-widest">
              Aussi dans <span className="text-accent">{video.category}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} href={`/videos/${r.id}`} className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-accent/40 transition-all">
                  <div className="aspect-video overflow-hidden bg-surface">
                    <img
                      src={r.thumbnail}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/640x360/181818/555555?text=${encodeURIComponent(r.category)}`
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors"
                      style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em', fontSize: '0.95rem' }}>
                      {r.title}
                    </p>
                    <p className="text-xs text-muted mt-1">{r.author} · {r.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}