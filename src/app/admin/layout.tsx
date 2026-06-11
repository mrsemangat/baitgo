import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin — Umrava' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')
  if (!session.user.isAdmin) redirect('/dashboard')

  const [userRow] = await db.select({ fullName: users.fullName, email: users.email })
    .from(users).where(eq(users.id, session.user.id)).limit(1)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar adminName={userRow?.fullName ?? userRow?.email ?? 'Admin'} />
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
