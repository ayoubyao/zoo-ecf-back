import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getDictionary } from '@/locales/dictionary'
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import { SecurityService } from '@/services/security'
import { environment } from '@/environnement/environnement'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        return { ...token, user: { ...user as User } }
      }

      return token
    },
    async session({ session, token }) {
      return { ...session, user: token.user }
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: 'string' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        const { username, password } = credentials
        const url = `${environment.apiUrl}/security`
        const data = {
          username,
          password,
        }
        const headers = {
          'Content-Type': 'application/json',
        }

        // Replace with real authentication here
        const token = await axios.post(url, data, { headers })

        const dict = await getDictionary()

        if (token == null) {
          throw new Error(dict.login.message.auth_failed)
        }
        
        return {
          id: 1,
          name: 'Name',
          username,
          email: '',
          avatar: 'assets/favicon/favicon-32x32.png',
        }
      },
    }),
  ],
  secret: process.env.SECRET
}
