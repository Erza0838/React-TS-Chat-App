import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const POST = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const 
    {
        SenderMessageId,
        SenderMessageContactName,
        PersonalMessageText,
        MessageRecipientId,
        PersonalContactOwnerId
    } = await request.json() 
    
    const PersonalMessageInformation = 
    [
        {
            SenderPersonalMessageId: session?.user.id as string,
            PersonalMessageRecipientId: MessageRecipientId,
            SenderPersonalMessageName: session?.user.name as string,
            PersonalMessage: PersonalMessageText
        }
    ] as Prisma.JsonArray   

    const InsertPersonalMessage = await prisma.personal_Chat_Model.create(
    {
        data:
        { 
            My_Messages: PersonalMessageInformation,
            Messages_To_All: PersonalMessageInformation,
            // Personal_Chat_Recipient_Id: PersonalContactOwnerId as string,
            Contact_Owner_Id: session?.user.id as string,
            Create_Personal_Message: new Date(), 
        }        
    })
    if(InsertPersonalMessage) 
    {
        console.log("Pesan berhasil dikirim")
        return NextResponse.json({InsertPersonalMessage},{status: 200})
    }
    if(!InsertPersonalMessage) 
    {
        console.log("Pesan gagal dikirim")
        return NextResponse.json({error: "Pesan gagal dikirim"},{status: 400})
    }
}