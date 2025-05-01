import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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
    // const FilteredPersonalMeessages = GetSenderPersonalMessage.flatMap(chat => 
    // {   
    //     const MyMessages = chat.My_Messages as unknown as PersonalMessageInterface[]
    //     if(IsPersonalMessageArray(MyMessages)) 
    //     {
    //         return MyMessages.filter(Messages => Messages.SenderPersonalMessageId !== null &&
    //                 Messages.PersonalMessage !== null).map(PersonalMessage => PersonalMessage.PersonalMessage && PersonalMessage.PersonalMessageRecipientId) 
    //     }
    // })
    // if(FilteredPersonalMeessages !== null) 
    // {   
    //     // return NextResponse.json(FilteredPersonalMeessages.toString())
    //     return NextResponse.json(FilteredPersonalMeessages)
    // }
    // if(FilteredPersonalMeessages === null) 
    // {
    //     return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    // }
    if(GetSenderPersonalMessage !== null) 
    {   
        // return NextResponse.json(FilteredPersonalMeessages.toString())
        return NextResponse.json(GetSenderPersonalMessage)
    }
    if(GetSenderPersonalMessage === null) 
    {
        return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    }
}