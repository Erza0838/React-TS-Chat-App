import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const POST = async (request: NextRequest,response: NextResponse) => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) 
    {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const RawDescriptionProfileValue = await request.json()
    const DescriptionProfileValue = RawDescriptionProfileValue.InsertDescription.replace(/"/g,'')
    const InsertDescriptionProfile = await prisma.userDescription.create({
        data: {
            UserDescription: DescriptionProfileValue,
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
    if(InsertDescriptionProfile) 
    {
        console.log("Deskripsi user : " + InsertDescriptionProfile)
    }

    return NextResponse.json({ success: true })
}
