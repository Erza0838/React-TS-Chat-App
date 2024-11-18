import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"

// export const PUT = async (request: NextRequest,response: NextResponse) =>
export const POST = async (request: NextRequest,response: NextResponse) =>
{   
    const {username} = await request.json()
    const session = await getServerSession()
    console.log("Username dari request body : " + JSON.stringify(username))
    console.log("Username dari session : " + session?.user.name)
    try 
    {   
        const SessionValue = session?.user.name
        const DoesUsernameValid = await prisma.userModel.findFirst({
            where: 
            {
                Username: SessionValue!
            },
            select: 
            {
                Username: true
            }
        })
        if(!DoesUsernameValid) 
        {
            return NextResponse.json({error: "User : " + session?.user.name + " tidak ada"},{status: 400})   
        }

        if(!session) 
        {
            return NextResponse.json({error: "Login gagal"},{status: 400})
        }

        if(!session.user.id) 
        {
            // return NextResponse.json({error: "Id tidak ditemukan"},{status: 400})
            console.log("Id tidak ditemukan")
        }
        

        const UpdateUsername = await prisma.userModel.update({
            where: 
            {
                id: session.user.id as string
                // id: userId
                // Username: 
            },
            data: 
            {
                Username: username
            }
        })
        if(UpdateUsername)
        {
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