import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" 
{
    interface Session {
        user: {
            id: string | null | undefined,
            email: string | null | undefined,
            name: string | null | undefined
        } & DefaultSession["user"]  
    }
    // interface User {
    //     id: string
    // }
    // interface Session {
    //     user: User
    // }
}