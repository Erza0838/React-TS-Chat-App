import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare, compareSync } from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"
import bcrypt from "bcrypt"
// import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = 
{   
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma) as Adapter,
    session: 
    {   
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    pages: 
    {
        signIn: "/login"
    },
    providers: 
    [
        CredentialsProvider({
            name: "credentials",
            id: "credentials",
            credentials: 
            {
                email: {label: "email",type: "email",placeholder: "email"},
                password: {label: "password", type: "pass",placeholder:"password"}
            },
            async authorize(credentials) 
            {
                if (!credentials) 
                {
                    return null
                }
                
                // Call your authentication function
                const user = await prisma.userModel.findFirst({
                    where: 
                    {
                        Password: credentials?.email
                    } ,
                    select: 
                    {
                        Email: true,
                        Password: true,
                        id: true,
                        Username: true
                    }
                })
                const FindAuthorizeEmail = await prisma.userModel.findFirst({
                    where: 
                    {
                        Email: credentials.email
                    } 
                })
                const FindAuthorizePassword = await prisma.userModel.findFirst({
                    where: 
                    {
                        Password: credentials.password
                    } 
                })
                if(!FindAuthorizeEmail) 
                {
                    console.error(`Email : ${credentials.email} tidak ditemukan`)
                    // return user
                } 
                if(!FindAuthorizePassword) 
                {
                    console.error(`Password : ${credentials.password} tidak ditemukan`)
                } 
                if(!user)
                {
                    return null
                }       
                const isPasswordValid = await bcrypt.compare(credentials?.password || "",user?.Password)

                if(isPasswordValid && user)
                {
                    return {
                        id: user?.id,
                        Email: user?.Email, 
                        name: user?.Username
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async signIn({user, account, email}) 
        {
            const userExists = await prisma.userModel.findFirst(
            {
                where:
                {
                    Email: user.email!
                }
            })
            if(userExists) 
            {
                return true
            } 
            else 
            {
                return "/hompage"
            }
        },
        async jwt({ token, user }) 
        {
            user && (token.user = user)
            return token
        }
        // async session({ session, token }) {
        //     session.user = token.user
        //     return session
        // }
    }
}   