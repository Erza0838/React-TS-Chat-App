import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface PersonalMessageInterface 
{
    SenderPersonalMessageId: string
}

// function IsPersonalMessageArray(value: unknown): value is Array<PersonalMessageInterface>
function IsPersonalMessageArray(value: unknown): value is PersonalMessageInterface[]
{
    return Array.isArray(value) && value.every(
        item => typeof item === "object" && item !== null && "SenderPersonalMessageId" in item
    )
}

export const GET = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findMany() 
    const FilteredPersonalMeessages = GetSenderPersonalMessage.filter(chat => 
    {
        const MyMessages = chat.My_Messages
        const Messages = chat.Messages_To_All
        return (
            IsPersonalMessageArray(MyMessages) && MyMessages.some(Messages => Messages.SenderPersonalMessageId === session?.user.id) ||
            IsPersonalMessageArray(Messages) && Messages.some(Messages => Messages.SenderPersonalMessageId === session?.user.id)
        )
    })
    
    if(FilteredPersonalMeessages !== null) 
    {   
        return NextResponse.json(JSON.stringify(FilteredPersonalMeessages), {status: 200})
    }
    if(FilteredPersonalMeessages === null) 
    {
        return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    }
}