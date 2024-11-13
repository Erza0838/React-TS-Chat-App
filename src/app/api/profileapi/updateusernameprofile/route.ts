import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"

export const PUT = async (request: NextRequest,response: NextResponse) =>
// export const POST = async (request: NextRequest,response: NextResponse) =>
{   
    const {username} = await request.json()
    try 
    {   
        const session = await getServerSession()
        const DoesUsernameValid = await prisma.userModel.findFirst({
            where: 
            {
                Username: username 
            },
            select: 
            {
                Username: true
            }
        })
        if(!DoesUsernameValid) 
        {
            return NextResponse.json({error: "User tidak ditemukan"},{status: 400})   
        }

        if(!session) 
        {
            return NextResponse.json({error: "Login gagal"},{status: 400})
        }

        const UpdateUsername = await prisma.userModel.update({
            where: 
            {
                id: session.user.id as string
                // Username: username
            },
            data: 
            {
                Username: username
            }
        })

        return NextResponse.json({success: "Username diubah"},{status: 200})
    } 
    catch(error: unknown | any) 
    {
        return NextResponse.json({error: error.message},{status: 500})
    }
}