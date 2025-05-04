import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ReceiptIcon } from "lucide-react"

interface PersonalMessageInterface 
{
    SenderPersonalMessageId: string
    PersonalMessageRecipientId: string
    PersonalMessage: string
}

// function IsPersonalMessageArray(value: unknown): value is PersonalMessageInterface[]
function IsPersonalMessageArray(value: unknown): value is Array<PersonalMessageInterface>
{
    return Array.isArray(value) && value.every(item => "PersonalMessage" in item && "SenderPersonalMessageId" in item)
}

// export const GET = async (request: NextRequest, response: NextResponse) => 
export const GET = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findMany() 
    const FilteredPersonalMeessages = GetSenderPersonalMessage.flatMap(chat => 
    {   
        const MyMessages = chat.My_Messages as unknown as PersonalMessageInterface[]
        if(IsPersonalMessageArray(MyMessages)) 
        {
            return MyMessages.filter(Messages => Messages.SenderPersonalMessageId !== null && Messages.PersonalMessage !== null).map((PersonalMessage) => 
            ({
                PersonalMessageRecipientId: PersonalMessage.PersonalMessageRecipientId,
                PersonalMessageText: PersonalMessage.PersonalMessage,
                // RecipientId: PersonalMessage.PersonalMessageRecipientId,
                // PersonalMessages: PersonalMessage.PersonalMessage,
            }))
        }
        return []
    })
    if(FilteredPersonalMeessages !== null) 
    {   
        console.log(FilteredPersonalMeessages[0])
        const FilterMessage = FilteredPersonalMeessages[0]
        // const FilterMessage = FilteredPersonalMeessages.map((messages) => 
        // ({
        //     RecipientId: messages.RecipientId,
        //     Message: messages.Message,
        // }))
        return NextResponse.json(FilterMessage)
    }
    if(FilteredPersonalMeessages === null) 
    {
        return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    }
    // if(GetSenderPersonalMessage !== null) 
    // {   
    //     // return NextResponse.json(FilteredPersonalMeessages.toString())
    //     return NextResponse.json(GetSenderPersonalMessage)
    // }
    if(GetSenderPersonalMessage === null) 
    {
        return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    }
}