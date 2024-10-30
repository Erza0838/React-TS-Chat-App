import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare, compareSync } from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = 
{   
    providers: 
    [
        CredentialsProvider({
            name: "credentials",
            id: "credentials",
            credentials: 
            {
                email: {label: "email",type: "email",placeholder: "email"},
                password: {label: "password", type: "pass",placeholder:"password"},
                
            },
            async authorize(credentials) 
            {
                if(!credentials) 
                {
                    return null
                }
                try 
                {
                    // Call your authentication function
                    const user = await prisma.userModel.findFirst({
                        where: 
                        {
                            Email: credentials.email
                        } ,
                        select: 
                        {
                            Email: true,
                            Password: true,
                            id: true,
                            Username: true
                        }
                    })

                    // Periksa email dan password dari database
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
                }
                catch(error) 
                {
                    throw new Error("Auth error : " + error)
                }
                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_URL,
    adapter: PrismaAdapter(prisma) as Adapter,
    // debug: process.env.NODE_ENV === "production",
    debug: true,
    session: 
    {   
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    pages: 
    {
        signIn: "/login"
    },
    callbacks: 
    {
        async jwt({token,user}) 
        {
            if(user) 
            {
                token.id = user.id,
                token.email = user.email,
                token.name = user.name
            }
            return token
        },
        async session({session,token}) 
        {   
            if(token)
            {
                session.user = 
                {
                    ...session.user,
                    email: token.email,
                    name: token.name
                }
            }
            return session
        }
    }
}   