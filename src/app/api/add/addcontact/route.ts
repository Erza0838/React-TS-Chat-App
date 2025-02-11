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

    console.log("ID kontak dari database : " + JSON.stringify(FindContact))
    console.log("ID kontak dari tag input : " + JSON.stringify(FindContact))
    console.log("ID kontak dari session : " + JSON.stringify(session?.user?.id))

    if(FindContact !== session?.user?.id) 
    { 
      const AddNewContact = await prisma.user_Contacts.create(
      {
          data: 
          {
              ContactInformation: UserContactInformation,
              Contacts_Id: session?.user?.id as string,
              DefaultUsername: session?.user?.name as string
          }
      })
      console.log("Kontak ditemukan : " + UserContactId, SavedUsernameContact)
      return NextResponse.json({AddNewContact}, {status: 200}) 
    }
    else if(FindContact === UserContactId) 
    { 
      console.log("Tidak bisa menambahkan id sendiri")
      return null
      return NextResponse.json({error: "Tidak bisa menambahkan id sendiri"}, {status: 400}) 
    }

    if(!FindContact) 
    {
      console.log("Kontak tidak ditemukan")
      return NextResponse.json({error: "User tidak ditemukan"}, {status: 400})
    }
}