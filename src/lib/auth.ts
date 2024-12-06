import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import bcrypt from "bcrypt"
import { prisma } from "@/app/Database"

export const authOptions: NextAuthOptions = 
{
    session: 
    {
        strategy: "jwt",
        maxAge: 60 * 60 * 24
    },
    pages: 
    {
        signIn: "/login"
    },
    providers: 
    [
        CredentialsProvider({
            credentials: 
            {
                email: {},
                password: {},
                
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
                        },
                        select: 
                        {
                            Email: true,
                            Password: true,
                            id: true,
                            Username: true
                        }
                    })

                    if(!user) 
                    {   
                        console.log("User email : " + credentials.email + "tidak ada") 
                        return null
                    }

                    const isPasswordValid = await bcrypt.compare(credentials?.password, user?.Password)
                    if(isPasswordValid && user)
                    {   
                        return {
                            id: user?.id,
                            email: user?.Email, 
                            name: user?.Username
                        }
                    }   
                    return user
                }
                catch(error) 
                {
                    throw new Error("Auth error : " + error)
                }
            }
        })
    ],
    callbacks:
    {
        async jwt({token,user,trigger,session}) 
        {   
            if(trigger === "update") 
            {
                return {...token,...session.user}
            }
            if(user) 
            {   
                token.email = user.email 
                token.name = user.name 
                token.sub = user.id 
            }
            return token
        },
        async session({token,session}) 
        {   
            if(token) 
            {   
                session.user = {
                    email: token.email,
                    name: token.name,
                    id: token.sub,
                    // emoji: session.user.emoji
                }
            }
            return session
        },
    }
}