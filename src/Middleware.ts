// "use server"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest)
{   
    const Token = request.cookies.get("session")?.value

    if(request.nextUrl.pathname.startsWith("/pages") && Token != null)
    {   
        console.log("Halaman register dan token dari register user : ") 
        console.log(Token)
        return
        // redirect("/pages")
        // return NextResponse.redirect(new URL("/pages",request.url))
    }
    // if(request.nextUrl.pathname.startsWith("/pages"))
    // {
    //     console.log("Pindah ke halaman login")
    // }
    else if(Token == null)
    {
        console.log("Token kosong")
        // return NextResponse.redirect(new URL("/",request.url))
        // return
    }
}

export const RouteConfig = 
{
    matcher: ["/","/pages"]
}