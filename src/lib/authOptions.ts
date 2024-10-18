import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"

export const authOptions: NextAuthOptions = 
{   
    session: 
    {
        strategy: "jwt"
    },
    providers: 
    [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials,req) {
                return null
            }
        })
    ]
}