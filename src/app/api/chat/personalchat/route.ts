import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { pusherServer } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"

interface PersonalMessageInterface 
{
    PersonalMessageSenderId : string,
    NamePersonalContact : string,
    PersonalMessageText : string,
    PersonalMessageReceiverId : string,
    FriendsContactId: string
}

export const POST = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const 
    {
        PersonalMessageSenderId,
        NamePersonalContact,
        PersonalMessageText,
        PersonalMessageReceiverId,
        FriendsContactId
    } : PersonalMessageInterface = await request.json()
    
    
    pusherServer.trigger(
        toPusherKey(`Id-pesan-pribadi-${FriendsContactId}`), 
        "Mengirim pesan pribadi", 
    {
        PersonalMessageSenderId,
        NamePersonalContact,
        PersonalMessageText,
        PersonalMessageReceiverId,
        FriendsContactId
    })

    const PersonalMessageInformation = 
    [
        {
            PersonalMessageSenderId: PersonalMessageSenderId,
            NamePersonalContact: NamePersonalContact,
            PersonalMessageText: PersonalMessageText,
            PersonalMessageReceiverId: PersonalMessageReceiverId,
            FriendsContactId: FriendsContactId
        }
    ] as Prisma.JsonArray   

    const InsertPersonalMessage = await prisma.personal_Chat_Model.create(
    {
        data:
        { 
            My_Messages: PersonalMessageInformation,
            Messages_To_All: PersonalMessageInformation,
            Personal_Contact_Enhancer_Id: PersonalMessageSenderId,
            Personal_Contact_Receiver_Id: PersonalMessageReceiverId,
            Friends_Contact_Id: FriendsContactId,
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