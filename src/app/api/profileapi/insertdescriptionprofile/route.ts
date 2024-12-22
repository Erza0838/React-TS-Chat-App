import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const POST = async (request: NextRequest,response: NextResponse) => 
{   
    const RawDescriptionProfile = await request.json()
    const DescriptionValue = RawDescriptionProfile.InsertDescription.replace(/"/g,'')
    const session = await getServerSession(authOptions)
    // console.log("Session server : " + JSON.stringify(session))
    // console.log("Request header : " + JSON.stringify(request.headers))
    if (!session?.user?.id) 
    {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if(session === null) 
    {
        return NextResponse.json({ error: "Session null" }, { status: 401 })
    }
    const InsertDescriptionProfile = await prisma.userDescription.create(
    {
        data: 
        {
            UserDescription: DescriptionValue,
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

    return NextResponse.json({ success: true })
}