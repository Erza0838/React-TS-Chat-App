import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { clerkMiddleware } from "@clerk/nextjs/server"

export default async function middleware(request: NextRequest)
{    
    const Token = request.cookies.get("session")?.value
    // if(request.nextUrl.pathname.startsWith("/login") && Token != null)
    // {   
    //     return NextResponse.redirect(new URL(`/homepage`,request.url))
    // }
    // if(request.nextUrl.pathname.startsWith("/homepage") && Token == null)
    // {
    //     return NextResponse.redirect(new URL("/",request.url))
    // }
    // return NextResponse.next()
    matcher: ["/homepage"]
}