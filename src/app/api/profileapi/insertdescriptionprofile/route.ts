import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const POST = async (request: NextRequest,response: NextResponse) => 
{   
    const {UserDescription} = await request.json()
    console.log("Insert Deskripsi : " + UserDescription)
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) 
    {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    // if(session === null) 
    // {
    //     return NextResponse.json({ error: "Session null" }, { status: 401 })
    // }
    const InsertDescriptionProfile = await prisma.userDescription.create(
    {
        data: 
        {
            UserDescription: UserDescription as string,
            UserIdReference: 
            {
                connect: 
                {
                    id: session.user.id
                }
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })
    console.log("Deskripsi baru : " + InsertDescriptionProfile)
    return NextResponse.json({ success: true })
}