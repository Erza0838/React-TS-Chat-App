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

    // const CountContactId = await prisma.user_Contacts.count(
    // {
    //   where: 
    //   {
    //     Contact_Id_References: session?.user.id as string,
    //   }      
    // })

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
      console.log("Jumlah id pribadi: 0")
      const AddNewContact = await prisma.user_Contacts.create(
      {
          data: 
          {
              ContactInformation: UserContactInformation,
              UserContactId: 
              {
                  connect: 
                  {
                      id: session?.user?.id as string
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