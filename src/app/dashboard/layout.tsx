import { Sidebar } from '@/components/dashboard/Sidebar'
import { PlanProvider } from '@/components/dashboard/PlanProvider'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, checklistProgress } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')

  const [userRow] = await db.select().from(users)
    .where(eq(users.id, session.user.id)).limit(1)

  const checklist = await db.select({ itemId: checklistProgress.itemId })
    .from(checklistProgress)
    .where(and(
      eq(checklistProgress.userId, session.user.id),
      eq(checklistProgress.checked, true)
    ))

  const totalItems = 32
  const progress = Math.round((checklist.length / totalItems) * 100)
  const isPremium = userRow?.plan === 'premium'

  return (
    <PlanProvider isPremium={isPremium}>
      <div className="min-h-screen bg-[#FBF7F0]">
        <Sidebar
          userName={userRow?.fullName ?? undefined}
          departureDate={userRow?.departureDate ?? undefined}
          prepProgress={progress}
          isPremium={isPremium}
        />
        <main className="lg:ml-64 min-h-screen">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </PlanProvider>
  )
}
