import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async (request: NextRequest,response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    if(!session) 
    {   
        return NextResponse.json({ error: "Session kosong"}, { status: 401 })
    }
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
    if(!SelectDescriptionProfile || SelectDescriptionProfile.length === 0) 
    {
        return NextResponse.json({error: "Deskripsi profile tidak ditemukan"}, {status: 404})
    }
    const description = SelectDescriptionProfile.map(item => item.UserDescription).join(", ")
    const cleanedStringDescription = description.replace(/^"|"$/g, "")
    if(SelectDescriptionProfile) 
    {   
        return NextResponse.json(cleanedStringDescription)
    }
}