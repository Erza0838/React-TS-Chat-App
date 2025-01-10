import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const PUT = async (request: NextRequest,response: NextResponse) =>
// export const POST = async (request: NextRequest,response: NextResponse) =>
{  
    const {Username} = await request.json()
    console.log("Username baru : " + Username)
    const session = await getServerSession(authOptions)

    if(!session) 
    {
        console.error("Unauthorized")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if(!session.user.id) 
    {   
        console.error("Id tidak ditemukan")
        return NextResponse.json({error: "Id tidak ditemukan"},{status: 400})
    }
    
    const UpdateUsername = await prisma.userModel.update(
    {
        where:  
        {
            id: session.user.id as string,
        },
        data: 
        {
            Username: Username
            // Username: RawUsername
        }
    })
    const SeletUserData = await prisma.userModel.findUnique({
        where: 
        {
            id: session.user.name as string
        },
        select: 
        {
            Username: true
        }
    })

    if(UpdateUsername)
    {   
        console.log("Data yang sudah terupdate : " + JSON.stringify(SeletUserData))
        return NextResponse.json({success: "Username diubah"},{status: 200})
    }
    if(!UpdateUsername)
    {
        return NextResponse.json({success: "Username gagal diubah"},{status: 400})
    }
}