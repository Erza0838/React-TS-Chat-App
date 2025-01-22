import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// export const PUT = async (request: NextRequest,response: NextResponse) => 
export const POST = async (request: NextRequest,response: NextResponse) => 
{
    const {NewProfileDescription} = await request.json()
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) 
    {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const PreviousDescription = await prisma.userDescription.findFirst(
    {
        where: 
        {
            UserIdReference:
            {
                id: session.user.id
            }
        }
    })

    const UpdateProfileDescription = await prisma.userDescription.update(
    {
        where: 
        {
            UserDescriptionId: PreviousDescription?.UserDescriptionId
        },
        data: 
        {
            UserDescription: NewProfileDescription
        }
    })   
    
    console.log("Deskripsi baru : " + UpdateProfileDescription) 

    return NextResponse.json({ success: true })
}
