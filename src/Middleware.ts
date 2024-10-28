import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export default async function middleware(request: NextRequest)
{    
    const Token = request.cookies.get("session")?.value
    const res = NextResponse.next()
    // if(request.nextUrl.pathname.startsWith("/login") && Token != null)
    // {   
    //     return NextResponse.redirect(new URL(`/homepage`,request.url))
    // }
    // if(request.nextUrl.pathname.startsWith("/homepage") && Token == null)
    // {
    //     return NextResponse.redirect(new URL("/",request.url))
    // }
    // return NextResponse.next()
}

export const RouteConfig = 
{
    matcher: ["/","/login","homepage"]
}