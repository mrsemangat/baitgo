import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from './db'
import { users, accounts } from './db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { sendEmail } from './mailketing'
import { buildWelcomeEmail } from './emailTemplates'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users as any,
    accountsTable: accounts,
  }),
  session: { strategy: 'jwt' },
  events: {
    async createUser({ user }) {
      if (!user.email) return
      const nama = (user.name ?? user.email.split('@')[0]).split(' ')[0]

      // Sync fullName dari name (yang diisi Google OAuth via DrizzleAdapter)
      await db.update(users)
        .set({ fullName: user.name ?? nama, updatedAt: new Date() })
        .where(eq(users.id, user.id!))
        .catch(() => {})

      // Welcome email (fire-and-forget)
      sendEmail(buildWelcomeEmail({ nama_user: nama, email: user.email })).catch(() => {})
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const result = await db.select().from(users)
          .where(eq(users.email, credentials.email as string)).limit(1)
        const user = result[0]
        if (!user || !user.password) return null
        const valid = await bcrypt.compare(credentials.password as string, user.password)
        if (!valid) return null
        return {
          id: user.id,
          email: user.email,
          name: user.fullName || user.name,
          image: user.image,
          isAdmin: user.isAdmin ?? false,
          plan: user.plan ?? 'free',
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        // Fetch fresh isAdmin + plan from DB on first sign-in
        const dbUser = await db.select({
          isAdmin: users.isAdmin,
          plan: users.plan,
          fullName: users.fullName,
        }).from(users).where(eq(users.id, user.id!)).limit(1)
        token.isAdmin = dbUser[0]?.isAdmin ?? false
        token.plan = dbUser[0]?.plan ?? 'free'
        if (dbUser[0]?.fullName) token.name = dbUser[0].fullName
      }
      if (trigger === 'update' && session) {
        if (session.plan) token.plan = session.plan
        if (session.name) token.name = session.name
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.isAdmin = token.isAdmin as boolean
      session.user.plan = token.plan as string
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
})
