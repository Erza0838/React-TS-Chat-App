import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { clerkMiddleware } from "@clerk/nextjs/server"

// export const RouteConfig = 
// {
//     matcher: ["/","/login","homepage"]
// }

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




// export default clerkMiddleware()

// export const config = 
// {
//     matcher: 
//     [
//         // Skip Next.js internals and all static files, unless found in search params
//         '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//         // Always run for API routes
//         '/(api|trpc)(.*)',
//     ]    
// }