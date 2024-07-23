import { NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "./lib/Authentication"
import { redirect } from "next/navigation"
import SecretToken from "./lib/UpdateSession"

export async function Middleware(request: NextRequest)
{
    const verifiedToken = 
    SecretToken && 
    (await verifyAuth(SecretToken).catch((err) => 
    {
        console.log(err)
    }))

    if(request.nextUrl.pathname.startsWith("/") && !verifiedToken)
    {
        return 
    }
    else 
    {
        // return NextResponse.redirect(new URL("/pages", request.url))
        // return NextResponse.redirect(new URL("/pages", request.url))

        console.log("=== Data cookie ===")
        console.log(SecretToken)
        redirect("/pages")
    }
    // if(!verifiedToken)
    // {
    //     return NextResponse.redirect(new URL("/", request.url))
    // }
    // if(request.url.includes("/") && verifiedToken)
    // {
    //     return NextResponse.redirect(new URL("/pages", request.url))
    // }
}

export const RouteConfig = 
{
    matcher: ["/"]
}