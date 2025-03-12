import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const FindContactOwner = await prisma.userModel.findFirst({
        where: {
            id: session?.user.id ?? ""
        }
    })
    if(FindContactOwner) 
    {
        const ShowMyFriends = await prisma.user_Contacts.findMany({
            select: 
            {
                ContactInformation: true
            }
        })
        // const MyContactList = ShowMyFriends.map(item => item.ContactInformation).join("")
        // const CleanedStringMyContactList = 
        return NextResponse.json({contact: JSON.stringify(ShowMyFriends)}, {status: 200})
    }
}