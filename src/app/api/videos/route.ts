import { NextResponse } from 'next/server'
import videos from '@/lib/videos.json'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const q = searchParams.get('q')?.toLowerCase()

  let result = videos as any[]

  if (category && category !== 'Tous') {
    result = result.filter(v => v.category === category)
  }
  if (q) {
    result = result.filter(
      v =>
        v.title.toLowerCase().includes(q) ||
        v.author.toLowerCase().includes(q) ||
        v.tags.some((t: string) => t.toLowerCase().includes(q))
    )
  }

  return NextResponse.json(result)
}
