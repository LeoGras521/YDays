export type VideoType = 'youtube' | 'vimeo' | 'mp4'

export interface Video {
  id: string
  title: string
  author: string
  promo: string
  category: string
  tags: string[]
  description: string
  type: VideoType
  videoId?: string      // for youtube / vimeo
  videoUrl?: string     // for mp4
  thumbnail: string
  duration: string
  date: string
}
