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
            name: "credentials",
            credentials: 
            {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
                
            },
            async authorize(credentials) 
            {
                if(!credentials?.email || !credentials.password) 
                {   
                    throw new Error("Email dan Password salah")
                    // return null
                }
                try 
                {
                    // Call your authentication function
                    const user = await prisma.userModel.findFirst({
                        where: 
                        {
                            Email: credentials.email
                        }
                    })

                    if(!user) 
                    {   
                        throw new Error("Email salah")
                        // console.log("User email : " + credentials.email + "tidak ada") 
                        // return null
                    }

                    const isPasswordValid = await bcrypt.compare(credentials?.password, user?.Password)
                    if(!isPasswordValid) 
                    {
                        throw new Error("Password salah")
                    }

                    // if(isPasswordValid && user)
                    // {   
                    //     return {
                    //         id: user?.id,
                    //         email: user?.Email, 
                    //         name: user?.Username
                    //     }
                    // }   
                    // return user
                    return {id: user.id, email: user.Email, name: user.Username,  image: user.UserProfilePicture}
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
                // token.expires = Date.now()
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