import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"

export const POST = async (request: NextRequest, response: NextResponse) => 
{
    const {SenderMessageId, SenderMessageContactName, PersonalMessageText} = await request.json()
    const PersonalMessageInformation = 
    [
        {
            SenderPersonalMessageId: SenderMessageId,
            SenderPersonalMessageName: SenderMessageContactName,
            PersonalMessage: PersonalMessageText
        }
    ] as Prisma.JsonArray   

    const InsertPersonalMessage = await prisma.personal_Chat_Model.create(
    {
        data:
        { 
            My_Messages: PersonalMessageInformation,
            Messages_To_All: PersonalMessageInformation,
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