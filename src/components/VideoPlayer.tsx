'use client'
import { Video } from '@/lib/types'

export default function VideoPlayer({ video }: { video: Video }) {
  if (video.type === 'youtube') {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (video.type === 'vimeo') {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
        <iframe
          className="w-full h-full"
          src={`https://player.vimeo.com/video/${video.videoId}?title=0&byline=0&portrait=0`}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // MP4
  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
      <video
        className="w-full h-full"
        controls
        poster={video.thumbnail}
        src={video.videoUrl}
      >
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    </div>
  )
}
