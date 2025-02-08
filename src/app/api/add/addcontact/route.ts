import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const POST = async (request: NextRequest) => 
{   
    const {UserContactId, Username,} = await request.json()
    const session = await getServerSession(authOptions)
    const UserContactInformation = 
    [
      {
        ContactId: UserContactId,
        SavedContactName: Username,
      }
    ] as Prisma.JsonArray

    const AddNewContact = await prisma.user_Contacts.create(
    {
        data: 
        {
            ContactInformation: UserContactInformation,
            Contacts_Id: session?.user?.id as string,
            DefaultUsername: session?.user?.name as string
        }
    })
    return NextResponse.json({AddNewContact})
}