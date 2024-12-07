import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const PUT = async (request: NextRequest,response: NextResponse) =>
{  
    // const RawUsername = await request.text()
    const data = await request.json()
    const CleandUsername = data.Username.replace(/"/g,'')
    // const CleandUsername = RawUsername.replace(/"/g,'')
    // const data = await request.json()
    console.log("Username dari input : " + CleandUsername)
    // console.log("Username dari input : " + RawUsername)
    const session = await getServerSession(authOptions)
    console.log("Session value: ", session)

    if(!session) 
    {
        console.error("Unauthorized")
        return new Response("Unauthorized", {status: 401})
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
            Username: CleandUsername 
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