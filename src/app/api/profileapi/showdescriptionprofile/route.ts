import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// export const POST = async (request: NextRequest,response: NextResponse) => 
export const GET = async (request: NextRequest,response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    // console.log("Cookie select data : " + JSON.stringify(session))
    // console.log("Request Cookie : " + request.cookies)
    // console.log("Request headers : " + JSON.stringify(request.headers))
    if(!session) 
    {   
        // console.log("Session kosong")
        return NextResponse.json({ error: "Session kosong"}, { status: 401 })
    }
    if(!session?.user?.id) 
    {   
        // console.log("Session id : " + session.user.id)
        return NextResponse.json({ cookie: session}, { status: 401 })
    }
    const SelectDescriptionProfile = await prisma.userDescription.findMany(
    {
        where: 
        {
            UserId: session.user.id as string
        },
        select: 
        {
            UserDescription: true
        }
    })   
    if(SelectDescriptionProfile) 
    {
        // console.log("Deskripsi user : " + JSON.stringify(SelectDescriptionProfile))
        return NextResponse.json({success: "Deskripsi user : " + JSON.stringify(SelectDescriptionProfile)})
    }
    return NextResponse.json({ success: true })
}