import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

type Params = Promise<{ slug: string }>

interface PersonalMessageInterface 
{
    PersonalMessageSenderId : string,
    NamePersonalContact : string,
    PersonalMessageText : string,
    PersonalMessageReceiverId : string
}

function IsPersonalMessageArray(value: unknown): value is Array<PersonalMessageInterface>
{
    return Array.isArray(value) && value.every(item => "PersonalMessage" in item && "SenderPersonalMessageId" in item)
}

export const GET = async (request: Request, 
{ params }: { params: { IdPersonalContactEnhancer: string,IdPersonalContactReceiver: string } }) => 
{   
    const session = await getServerSession(authOptions)
    const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findMany()

    const {  PersonalChatSenderId,PersonalChatRecipientId } = params
    // const FindPersonalMessageByContactOwnerId = await prisma.personal_Chat_Model.findMany({
    //     where: 
    //     {
    //         Contact_Owner_Id: session?.user.id!,
    //         Personal_Chat_Recipient_Id: PersonalChatRecipientId!
    //     }, 
    //     select: 
    //     {
    //         My_Messages: true,
    //         Messages_To_All: true
    //     }
    // })
    const FindPersonalMessageByContactOwnerId = await prisma.personal_Chat_Model.findMany({
        where: 
        {
            Contact_Owner_Id: PersonalChatSenderId!,
            FriendContactId: PersonalChatRecipientId!
        }
    })
    const FilteredPersonalMeessages = FindPersonalMessageByContactOwnerId.flatMap(chat => 
    {   
        const MyMessages = chat.My_Messages as unknown as Array<PersonalMessageInterface>
        if(IsPersonalMessageArray(MyMessages)) 
        {
            return MyMessages.filter(Messages => 
                                     Messages.SenderPersonalMessageId !== null && 
                                     Messages.PersonalMessage !== null && 
                                     Messages.PersonalMessageId !== null
            ).map((PersonalMessage) => 
            ({
                // PersonalMessageRecipientId: PersonalMessage.PersonalMessageRecipientId,
                PersonalMessageText: PersonalMessage.PersonalMessage,
                PersonalMessageId: PersonalMessage.PersonalMessageId
            }))
        }
        return []
    })

    if(FilteredPersonalMeessages !== null && FilteredPersonalMeessages.length > 0) 
    {   
        return NextResponse.json(
            {
              PersonalMessageField: FilteredPersonalMeessages[0].PersonalMessageText, 
            //   PersonalChatRecipientId: GetSenderPersonalMessage[0].Personal_Chat_Recipient_Id
            }, 
            {   
                status: 200
            }
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