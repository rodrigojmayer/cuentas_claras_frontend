import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      _id?: string;
      email?: string | null;
      name?: string | null;
    };
    backendToken?: string;
  }

  interface User {
    id: string;
    _id?: string;
    email: string | null;
    name: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id?: string;
      _id?: string;
      email?: string | null;
      name?: string | null;
    };
    backendToken?: string;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    /**
     * 🔐 GOOGLE autentica identidad
     * 🔐 BACKEND genera JWT propio
     */
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user?.email) {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
          }),
        });

        if (!res.ok) {
          throw new Error("Error autenticando con backend");
        }

        const data = await res.json();

        /**
         * 👇 datos del backend
         */
        token.user = data.user;
        token.backendToken = data.token;
      }

      return token;
    },

    /**
     * 📦 Lo que recibe el frontend
     */
    async session({ session, token }) {
      session.user = token.user as {
        id: string;
        _id?: string;
        email?: string | null;
        name?: string | null;
      };
      session.backendToken = token.backendToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };