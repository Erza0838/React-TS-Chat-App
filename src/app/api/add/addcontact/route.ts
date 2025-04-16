import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UserContactIdValidationSchema } from "@/lib/validations/UserInformationValidation"

export const POST = async (request: NextRequest, response: NextResponse) => 
{   
    const {UserContactId, SavedUsernameContact} = await request.json()
    const session = await getServerSession(authOptions)
    const GetContactIdFromInput = UserContactIdValidationSchema.safeParse(UserContactId)
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
    
    const CheckContactExist = await prisma.user_Contacts.findMany(
    {
      where:
      {
        ContactInformation: 
        {
          path: "$.ContactId",
          equals: UserContactId as string
        },
        MyId: session?.user.id ?? ""
      }
    })

    if(CheckContactExist) 
    { 
      console.log(`Kontak dengan id : ${UserContactId} sudah ada`)
      return NextResponse.json({error: "Kontak sudah ada"}, {status: 400})
    }
    if(!CheckContactExist) 
    { 
      console.log("ID kontak tidak ada")
      return NextResponse.json({error: "ID kontak tidak ada"}, {status: 400})
    }

    // if(FindContact && FindUser) 
    if(FindContact && FindUser && !CheckContactExist) 
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