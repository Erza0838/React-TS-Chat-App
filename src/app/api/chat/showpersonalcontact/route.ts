import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const ShowMyFriends = await prisma.user_Contacts.findUnique({
        where: 
        {
            MyId: session?.user.id ?? ""         
        },
    })
}