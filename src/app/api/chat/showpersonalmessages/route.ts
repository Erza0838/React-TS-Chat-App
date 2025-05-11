import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Turret_Road } from "next/font/google"

interface PersonalMessageInterface 
{
    SenderPersonalMessageId: string
    PersonalMessageRecipientId: string
    PersonalMessage: string
    PersonalMessageId: string
}

function IsPersonalMessageArray(value: unknown): value is Array<PersonalMessageInterface>
{
    return Array.isArray(value) && value.every(item => "PersonalMessage" in item && "SenderPersonalMessageId" in item)
}

export const GET = async (request: NextRequest, response: NextResponse) => 
{   
    const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findMany()
    const FilteredPersonalMeessages = GetSenderPersonalMessage.flatMap(chat => 
    {   
        const MyMessages = chat.My_Messages as unknown as Array<PersonalMessageInterface>
        if(IsPersonalMessageArray(MyMessages)) 
        {
            return MyMessages.filter(Messages => 
                                     Messages.SenderPersonalMessageId !== null && 
                                     Messages.PersonalMessage !== null && Messages.PersonalMessageId !== null
            ).map((PersonalMessage) => 
            ({
                PersonalMessageRecipientId: PersonalMessage.PersonalMessageRecipientId,
                PersonalMessageText: PersonalMessage.PersonalMessage,
                PersonalMessageId: PersonalMessage.PersonalMessageId
            }))
        }
        return []
    })
    if(FilteredPersonalMeessages !== null && FilteredPersonalMeessages.length > 0 && GetSenderPersonalMessage[0].Personal_Chat_Owner_Id !== null) 
    {   
        return NextResponse.json(
            {
              PersonalMessageField: FilteredPersonalMeessages[0].PersonalMessageText, 
              PersonalChatOwnerId: GetSenderPersonalMessage[0].Personal_Chat_Owner_Id,
            }, {status: 200}
        )
    }
    if(FilteredPersonalMeessages === null) 
    {
        return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    }
    if(GetSenderPersonalMessage === null) 
    {
        return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    }
}