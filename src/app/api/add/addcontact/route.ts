import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const POST = async (request: NextRequest, response: NextResponse) => 
{   
    const {UserContactId, SavedUsernameContact} = await request.json()
    const session = await getServerSession(authOptions)
    const UserContactInformation = 
    [
      {
        ContactId: UserContactId,
        SavedContactName: SavedUsernameContact,
      }
    ] as Prisma.JsonArray

    const FindUser = await prisma.userModel.findFirst({
      where: 
      {
        Email: session?.user.email ?? ""
      }
    })

    const FindContact = await prisma.userModel.findFirst(
    {
        where: 
        {
            id: UserContactId
        },
        select: 
        {
          id: true
        }      
    })

    if(FindContact) 
    {   
      const AddNewContact = await prisma.user_Contacts.create(
      {
          data: 
          {
              ContactInformation: UserContactInformation,
              UserContactId: 
              {
                connect: 
                {
                  id: FindUser?.id
                }
              }
          }
      })
      return NextResponse.json({AddNewContact}, {status: 200}) 
    }
    
    if(!FindContact) 
    {
      return NextResponse.json({error: "User tidak ditemukan"}, {status: 400})
    }
}