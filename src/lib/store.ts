// Simple in-memory store — swap with Supabase/Prisma/etc. when ready

export type Comment = {
  id: string
  videoId: string
  author: string
  text: string
  date: string
}

// Global state persisted across requests in dev (not production-safe for multi-instance)
// Replace with a real DB for production
const store: {
  likes: Record<string, number>
  comments: Record<string, Comment[]>
} = {
  likes: {},
  comments: {},
}

export function getLikes(videoId: string): number {
  return store.likes[videoId] ?? 0
}

export function toggleLike(videoId: string): number {
  store.likes[videoId] = (store.likes[videoId] ?? 0) + 1
  return store.likes[videoId]
}

export function getComments(videoId: string): Comment[] {
  return store.comments[videoId] ?? []
}

export function addComment(videoId: string, author: string, text: string): Comment {
  const comment: Comment = {
    id: Date.now().toString(),
    videoId,
    author,
    text,
    date: new Date().toISOString(),
  }
  if (!store.comments[videoId]) store.comments[videoId] = []
  store.comments[videoId].unshift(comment)
  return comment
}
