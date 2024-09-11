// "use server"
import { NextRequest, NextResponse } from "next/server"
import { UserModel } from "@prisma/client"
// import { decrypt } from "./lib/UpdateSession"
interface ValueData {
    data : UserModel
}
export default async function middleware(request: NextRequest,data: ValueData)
{    
    const Token = request.cookies.get("session")?.value
    if(request.nextUrl.pathname.startsWith("/login") && Token != null)
    {   
        return NextResponse.redirect(new URL("/homepage",request.url))
    }
    if(request.nextUrl.pathname.startsWith("/login"))
    {
        location.reload()
    }
    if(request.nextUrl.pathname.startsWith("/homepage") && Token == null)
    {
        return NextResponse.redirect(new URL("/",request.url))
    }

    // if(request.nextUrl.pathname.startsWith("/profilepage"))
    // {   
    //     if(Token != undefined)
    //     {
    //         const cookieData = await decrypt(Token)
    //         console.log("Data cookie halaman profile:" + cookieData)
    //     }
    // }
    return NextResponse.next()
}

export const RouteConfig = 
{
    matcher: ["/","/login","homepage"]
}