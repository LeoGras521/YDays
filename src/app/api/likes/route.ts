import { NextResponse } from 'next/server'
import { getLikes, toggleLike } from '@/lib/store'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const videoId = searchParams.get('videoId')
  if (!videoId) return NextResponse.json({ error: 'Missing videoId' }, { status: 400 })
  return NextResponse.json({ likes: getLikes(videoId) })
}

export async function POST(req: Request) {
  const { videoId } = await req.json()
  if (!videoId) return NextResponse.json({ error: 'Missing videoId' }, { status: 400 })
  const likes = toggleLike(videoId)
  return NextResponse.json({ likes })
}
