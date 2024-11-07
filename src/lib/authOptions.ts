import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare, compareSync } from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

// export const authOptions: NextAuthOptions = 
const handler = NextAuth(
{       
    session: 
    {
        strategy: "jwt",
        maxAge: 60 * 60 * 24
    },
    secret: process.env.NEXTAUTH_SECRET,
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
                password: {label: "password", type: "password",placeholder:"password"},
                
            },
            async authorize(credentials) 
            {
                if(!credentials) 
                {
                    return null
                }
                console.log("Data credential : " + JSON.stringify(credentials))
                try 
                {
                    // Call your authentication function
                    const user = await prisma.userModel.findFirst({
                        where: 
                        {
                            Email: credentials.email
                        },
                        select: 
                        {
                            Email: true,
                            Password: true,
                            id: true,
                            Username: true
                        }
                    })

                    const FindPassword = await prisma.userModel.findUnique({
                        where: 
                        { 
                            Password: credentials.password
                        },
                        select: 
                        {
                            Password: true
                        }
                    })
                    
                    if(!FindPassword) 
                    {
                        throw new Error(`Password ${credentials.password} tidak ditemukan`);
                    }

                    if(!user)
                    {   
                        console.log("User tidak ada")
                        return null
                    }       
                    const isPasswordValid = await bcrypt.compare(credentials?.password || "",user?.Password)

                    if(isPasswordValid && user)
                    {   
                        return {
                            id: user?.id,
                            email: user?.Email, 
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
    callbacks:
    {
        async jwt({token,trigger,account,profile,user,session}) 
        {   
            // console.log("JWT callback : ", 
            // {
            //     token,trigger,account,profile,user,session
            // })
            return token
        },
        async session({token,user,session,newSession,trigger}) 
        {   
            // console.log("Session callback : ", 
            // {
            //     token,user,session,newSession,trigger
            // })
            return session
        }
    }
})

export {handler as GET, handler as POST}