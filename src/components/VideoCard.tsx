'use client'
import Link from 'next/link'
import { Video } from '@/lib/types'

const TYPE_BADGE: Record<string, string> = {
  youtube: 'YT',
  vimeo: 'VI',
  mp4: 'MP4',
}

export default function VideoCard({ video, index }: { video: Video; index: number }) {
  return (
    <Link
      href={`/videos/${video.id}`}
      className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-accent/40 transition-all duration-300 fade-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both', opacity: 0 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-surface">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/640x360/181818/555555?text=${encodeURIComponent(video.category)}`
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
            <svg className="w-6 h-6 text-bg ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-xs font-medium px-2 py-0.5 rounded">
          {video.duration}
        </span>

        {/* Type badge */}
        <span className="absolute top-2 left-2 bg-black/70 text-accent text-xs font-bold px-2 py-0.5 rounded tracking-wider">
          {TYPE_BADGE[video.type]}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-widest text-accent/80 bg-accent/10 px-2 py-0.5 rounded-full">
            {video.category}
          </span>
        </div>

        <h3 className="font-display text-[1.15rem] leading-tight text-text group-hover:text-accent transition-colors line-clamp-2 mb-2"
          style={{ fontFamily: 'var(--font-display)' }}>
          {video.title}
        </h3>

        <p className="text-xs text-muted line-clamp-2 mb-3">{video.description}</p>

        <div className="flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-surface border border-border flex items-center justify-center text-[9px] font-bold text-accent uppercase">
              {video.author[0]}
            </span>
            {video.author}
          </span>
          <span>{video.promo}</span>
        </div>
      </div>
    </Link>
  )
}
