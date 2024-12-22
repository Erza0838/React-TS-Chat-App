import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const POST = async (request: NextRequest,response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    if(!session?.user?.id) 
    {
        return NextResponse.json({ cookie: session}, { status: 401 })
    }
    const SelectDescriptionProfile = await prisma.userDescription.findMany(
    {
        where: 
        {
            UserId: session.user.id as string
        },
        select: 
        {
            UserDescription: true
        }
    })   
    if(SelectDescriptionProfile) 
    {
        console.log("Deskripsi user : " + SelectDescriptionProfile)
        return NextResponse.json({success: "Deskripsi user : " + SelectDescriptionProfile})
    }
    return NextResponse.json({ success: true })
    // NextResponse.json({ success: "Deskripsi profile API" })
}