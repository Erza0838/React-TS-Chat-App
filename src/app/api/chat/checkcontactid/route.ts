import { NextRequest,NextResponse } from "next/server"
import {prisma} from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async (request: NextRequest, response: NextResponse) => 
{
    const {UserContactId, SavedUsernameContact} = await request.json()
    const CheckIfContactIdExist = await prisma.user_Contacts.findFirst(
    {
        where: 
        {
            ContactInformation: 
            {
                path: "$.ContactId",
                equals: UserContactId as string
            }
        }
    })
    if(CheckIfContactIdExist) 
    {
        console.log("Id sudah ada") 
    }
    return NextResponse.json({contact: JSON.stringify(CheckIfContactIdExist)}, {status: 200})
}