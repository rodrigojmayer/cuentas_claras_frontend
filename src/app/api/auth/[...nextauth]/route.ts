import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [

    // 🟠 LOGIN CON TU BACKEND (credentials)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        })

        const user = await res.json()

        if (!res.ok) return null
        return user // debe retornar usuario válido del backend
      }
    }),

    // 🔵 LOGIN CON GOOGLE
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user
      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }