import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const POST = async (request: NextRequest,response: NextResponse) => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {DescriptionProfileValue} = await request.json()
    const InsertDescriptionProfile = await prisma.userDescription.create({
        data: {
            UserDescription: DescriptionProfileValue,
            // UserModel_Reference: 
            // {
            //     connect: {
            //         id: session.user.id
            //     }
            // },
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })

    return NextResponse.json({ success: true })
}
