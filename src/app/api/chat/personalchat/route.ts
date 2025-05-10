import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const POST = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const {SenderMessageId,SenderMessageContactName,PersonalMessageText,MessageRecipientId,PersonalChatOwnerId} = await request.json()
    const PersonalMessageInformation = 
    [
        {
            SenderPersonalMessageId: SenderMessageId,
            PersonalMessageRecipientId: MessageRecipientId,
            SenderPersonalMessageName: SenderMessageContactName,
            PersonalMessage: PersonalMessageText
        }
    ] as Prisma.JsonArray   

    console.log("Pesan pribadi : " + JSON.stringify(PersonalMessageInformation))

    const InsertPersonalMessage = await prisma.personal_Chat_Model.create(
    {
        data:
        { 
            My_Messages: PersonalMessageInformation,
            Messages_To_All: PersonalMessageInformation,
            Personal_Chat_Owner_Id: PersonalChatOwnerId as string,
            Create_Personal_Message: new Date()
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