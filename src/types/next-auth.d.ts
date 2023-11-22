import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
    }
  }

  interface Profile {
    picture: string
    avatar_url: string
  }
}
