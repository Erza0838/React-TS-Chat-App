import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { randomUUID, UUID } from "crypto"

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

    const FindUser = await prisma.userModel.findFirst(
    {
      where: 
      {
        Email: session?.user.email ?? ""
      }
    })

    const FindContactId = await prisma.userModel.findUnique(
    {
        where: 
        {
            id: UserContactId
        }
    })  
    
    if(!FindContactId) 
    { 
      console.log(`Kontak id : ${UserContactId} tidak ada`)
      return NextResponse.json({error: `Kontak id : ${UserContactId} tidak ada`}, {status: 400})
    }

    // const CheckContactExist = await prisma.user_Contacts.findMany(
    // {
    //   where:
    //   {
    //     ContactInformation: 
    //     {
    //       path: "$.ContactId",
    //       equals: UserContactId as string
    //     },
    //     IdPersonalContactEnhancer: session?.user.id! 
    //   }
    // })

    // if(CheckContactExist.length > 0) 
    // { 
    //   return NextResponse.json({error: `Kontak : ${UserContactId} sudah ada`}, {status: 400})
    // }

    if(FindContactId && FindUser) 
    {   
      const AddNewContact = await prisma.user_Contacts.create(
      {
          data: 
          {
              ContactInformation: UserContactInformation,
              IdPersonalContactEnhancer: session?.user.id!,
              NamePersonalContactEnhancer: session?.user.name!,
              IdPersonalContactReceiver: UserContactId,
              NamePersonalContactReceiver: SavedUsernameContact,
              ItsFriend: true,
          }
      })
      return NextResponse.json({success: AddNewContact}, {status: 200}) 
    }
}