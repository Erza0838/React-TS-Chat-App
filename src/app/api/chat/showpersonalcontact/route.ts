import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const FindContactOwner = await prisma.userModel.findFirst(
    {
        where: 
        {
            id: session?.user.id ?? ""
        }
    })
    if(FindContactOwner) 
    {
        const ChekContactOwnerId = await prisma.user_Contacts.findMany(
        {
          where: 
          {
            MyId: 
            {
              equals: session?.user.id ?? ""
            }
          },
          select: 
          {
            ContactInformation: true,
            Contact_Id: true
          }
        })
        console.log(JSON.stringify(ChekContactOwnerId))
        return NextResponse.json({contact: ChekContactOwnerId}, {status: 200})
    }
}