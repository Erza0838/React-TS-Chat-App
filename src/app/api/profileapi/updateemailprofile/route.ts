import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const PUT = async (request: NextRequest,response: NextResponse) => 
{
    const RawEmail = await request.json()
    const CleandEmail = RawEmail.Email.replace(/"/g,'')
    const EmailSession = await getServerSession(authOptions)
    console.log("Email dari input : " + CleandEmail)

    console.log("Kadaluarsa : " + EmailSession?.expires)

    if(!EmailSession) 
    {
        console.error("Unauthorized")
        return new Response("Unauthorized", {status: 401})
    }

    if(!EmailSession.user.id) 
    {
        console.log("Id tidak ditemukan")
        return NextResponse.json({error: "Id tidak ditemukan"},{status: 400})
    }

    const UpdateEmailProfile = await prisma.userModel.update(
    {
        where: 
        {
            id: EmailSession.user.id as string
        },
        data :
        {
            Email: CleandEmail
        }
    })

    const SelectExistEmail = await prisma.userModel.findUnique(
    {
        where: 
        {
            id: EmailSession.user.id
        },
        select: 
        {
            Email: true
        }
    })

    if(!SelectExistEmail) 
    {
        console.error("Email tidak ditemukan")
        return NextResponse.json({error: "Email tidak ditemukan"},{status: 400})
    }

    if(UpdateEmailProfile) 
    {
        console.log("Email yang diupdate : " + JSON.stringify(SelectExistEmail))
        return NextResponse.json({success: "Email dibuah"},{status: 200})
    }

    if(!UpdateEmailProfile) 
    {
        console.log("Email gagal diubah")
        return NextResponse.json({success: "Email dibuah"},{status: 400})
    }
}