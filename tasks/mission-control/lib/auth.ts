import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // Check against hardcoded default credentials
        const defaultUsername = process.env.DEFAULT_USERNAME || 'amadu'
        const defaultPassword = process.env.DEFAULT_PASSWORD || 'change-this-password'

        if (credentials.username === defaultUsername && credentials.password === defaultPassword) {
          return {
            id: '1',
            name: 'Amadu Kamara',
            email: 'amadu@companyak.com',
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = 'Amadu Kamara'
      }
      return session
    },
  },
}
