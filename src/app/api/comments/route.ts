import { NextResponse } from 'next/server'
import { getComments, addComment } from '@/lib/store'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const videoId = searchParams.get('videoId')
  if (!videoId) return NextResponse.json({ error: 'Missing videoId' }, { status: 400 })
  return NextResponse.json(getComments(videoId))
}

export async function POST(req: Request) {
  const { videoId, author, text } = await req.json()
  if (!videoId || !author || !text)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const comment = addComment(videoId, author.trim(), text.trim())
  return NextResponse.json(comment, { status: 201 })
}
