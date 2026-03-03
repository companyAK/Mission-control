import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        try {
          // For now, accept hardcoded default credentials
          const defaultUsername = process.env.DEFAULT_USERNAME || 'amadu'
          const defaultPassword = process.env.DEFAULT_PASSWORD || 'change-this-password'

          if (credentials.username === defaultUsername && credentials.password === defaultPassword) {
            return {
              id: '1',
              name: 'Amadu Kamara',
              email: 'amadu@companyak.com',
            }
          }

          throw new Error('Invalid username or password')
        } catch (error) {
          throw new Error('Authentication failed')
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
