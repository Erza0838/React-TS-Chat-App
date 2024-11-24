import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const PUT = async (request: NextRequest,response: NextResponse) =>
{  
    const RawUsername = await request.text()
    const CleandUsername = RawUsername.replace(/"/g,'')
    const session = await getServerSession(authOptions)
    try 
    {   
        const SessionValue = session?.user.name
        const DoesUsernameValid = await prisma.userModel.findFirst({
            where: 
            {
                Username: SessionValue as string
            },
            select: 
            {
                Username: true
            }
        })
        if(!DoesUsernameValid) 
        {   
            console.error("User : " + session?.user.name + " tidak ada")
            return NextResponse.json({error: "User : " + session?.user.name + " tidak ada"},{status: 400})   
        }

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
        
        const UpdateUsername = await prisma.userModel.update({
            where:  
            {
                id: session.user.id as string,
            },
            data: 
            {
                Username: CleandUsername
            }
        })
        const SeletUserData = await prisma.userModel.findMany({
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
    catch(error: unknown | any) 
    {   
        console.log("Error update data : " + error) 
        return NextResponse.json({error: error.message},{status: 500})
    }
}