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
    PersonalMessageReceiverId : string,
    FriendsContactId: string
}

function IsPersonalMessageArray(value: unknown): value is Array<PersonalMessageInterface>
{
    return Array.isArray(value) && value.every(item => 
        typeof item === "object" && 
        item !== null &&
        "PersonalMessageText" in item &&
        "FriednsContactId" in item)
}

export const GET = async (request: Request,{ params }: { params: { Contact_Id: string } }) => 
{   
    const session = await getServerSession(authOptions)
    const { Contact_Id }  = params
    const FindPersonalMessageByContactOwnerId = await prisma.personal_Chat_Model.findMany({
        where: 
        {
            Friends_Contact_Id: Contact_Id
        }
    })

    const FilteredPersonalMeessages = FindPersonalMessageByContactOwnerId.flatMap(chat => 
    {   
        const MyMessages = chat.My_Messages as unknown as Array<PersonalMessageInterface>

        if(Array.isArray(MyMessages)) 
        {   
            const Filtered = MyMessages.filter(Messages => 
            {
                return (
                    Messages.NamePersonalContact !== null && 
                    Messages.PersonalMessageText !== null && 
                    Messages.FriendsContactId !== null
                )
            })

            return Filtered.map((PersonalMessages) => ({   
                PersonalMessagesText: PersonalMessages.PersonalMessageText,
                FriendsContactId: PersonalMessages.FriendsContactId
            }))
        }
        return []
    })

    console.log("Pesan pribadi : " + JSON.stringify(FilteredPersonalMeessages))

    if(FilteredPersonalMeessages !== null && FilteredPersonalMeessages.length > 0) 
    {   
        return NextResponse.json(
        {
            PersonalMessageField: FilteredPersonalMeessages[0].PersonalMessagesText
        }, 
        {
            status: 200
        })
    }
    else if(FilteredPersonalMeessages === null) 
    {
        return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    }

    // return NextResponse.json({fallback: true})
}