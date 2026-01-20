/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name: string
            email: string
            image?: string
            phone?: string
            role?: string
            token?: string
            [key: string]: any
        }
    }

    interface User {
        id: string
        name: string
        email: string
        phone?: string
        role?: string
        token?: string
        [key: string]: any
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string
            name: string
            email: string
            phone?: string
            role?: string
            token?: string
            [key: string]: any
        }
    }
}