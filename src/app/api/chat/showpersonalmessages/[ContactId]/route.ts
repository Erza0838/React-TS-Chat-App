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
export const GET = async (request: NextRequest, response: NextResponse, {params} : {params: {ContactId: string}}) => 
{   
    console.log("ContactId : " + params.ContactId)
    const session = await getServerSession(authOptions)
    // const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findUnique({
    //     where: 
    //     {

    //     }
    // }) 
    const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findMany() 
    const FilteredPersonalMeessages = GetSenderPersonalMessage.flatMap(chat => 
    {   
        const MyMessages = chat.My_Messages as unknown as PersonalMessageInterface[]
        if(IsPersonalMessageArray(MyMessages)) 
        {
            // return MyMessages.filter(Messages => Messages.SenderPersonalMessageId === session?.user.id &&
            //        Messages.PersonalMessage !== null).map(PersonalMessage => PersonalMessage.PersonalMessage)
            return MyMessages.filter(Messages => Messages.SenderPersonalMessageId !== null &&
                //    Messages.PersonalMessage !== null).map(PersonalMessage => PersonalMessage.PersonalMessage)
                   Messages.PersonalMessage !== null).map(PersonalMessage => PersonalMessage.PersonalMessageRecipientId)
        }
    })
    if(FilteredPersonalMeessages !== null) 
    {   
        return NextResponse.json(FilteredPersonalMeessages.toString())
    }
    if(FilteredPersonalMeessages === null) 
    {
        return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    }
}