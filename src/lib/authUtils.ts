import { auth } from './auth'
import type { Session } from 'next-auth'

export async function requireAdmin(): Promise<{ userId: string } | { error: string; status: number }> {
  const session = await auth()
  if (!session?.user) return { error: 'Unauthorized', status: 401 }
  if (!session.user.isAdmin) return { error: 'Forbidden', status: 403 }
  return { userId: session.user.id }
}

export async function requireAuth(): Promise<{ userId: string; user: Session['user'] } | { error: string; status: number }> {
  const session = await auth()
  if (!session?.user) return { error: 'Unauthorized', status: 401 }
  return { userId: session.user.id, user: session.user }
}
