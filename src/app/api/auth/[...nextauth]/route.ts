import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { findUserByEmail, postUser } from "@/lib/api";
import { NewUser } from "@/types";

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
    /**
     * Este callback se ejecuta cuando un usuario inicia sesión con Google.
    */
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;
        const name = user.name;
      
        // 1. Buscar usuario en la base de datos
        const findRes = await findUserByEmail(email)
        
        let existingUser = null;
        
        if (findRes.ok) {
          existingUser = await findRes.json();
        } 
        
        if (!existingUser) {
          console.log(`Usuario con email ${email} no encontrado`)
          const newUser: NewUser = {
            email: email,
            name: name
          }
          existingUser = await postUser(newUser)
          // return true;
        } 

        console.log(`Usuario con email ${email} encontrado: `, existingUser)
        user._id = existingUser._id;   
      }
      return true;

    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user
      }

      // When calling useSession().update()
      if (trigger === "update" && session?.user) {
        token.user = {
          ...token.user,
          ...session.user,
        }
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