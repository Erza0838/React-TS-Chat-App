import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Check } from "lucide-react"

interface ContactInformationProperties 
{
  ContactId: string
  SavedContactName?: string
}

interface PersonalContactInterace 
{
  ContactId: string
  SavedContactName?: string
  Contact_Id: string
  MyId: string
}

function IsPersonalContactArray(value: unknown): value is Array<PersonalContactInterace>
{
  return Array.isArray(value) 
}

export const GET = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const FindContactOwner = await prisma.userModel.findFirst(
    {
        where: 
        {
            id: session?.user.id ?? ""
        }
    })

    const ChekContactOwnerId = await prisma.user_Contacts.findMany(
    {
      where: 
      {
        MyId: 
        {
          equals: session?.user.id ?? ""
        }
      },
      select: 
      {
        ContactInformation: true,
        Contact_Id: true, 
        MyId: true
      }
    })

    const FilteredPersonalContact = ChekContactOwnerId.flatMap(PersonalContact => 
    {
      const MyPersonalContact = PersonalContact.ContactInformation as unknown as Array<PersonalContactInterace>
      if(IsPersonalContactArray(MyPersonalContact)) 
      {
        return MyPersonalContact.filter(PersonalContactData => PersonalContactData.ContactId !== null).map((AllPersonalContactData) => 
        ({
          ContactId: AllPersonalContactData.ContactId,
          SavedContactName: AllPersonalContactData.SavedContactName,
          Contact_Id: PersonalContact.Contact_Id,
        }))
      }
      return []
    })

    if(FindContactOwner !== null) 
    {
      if(FilteredPersonalContact.length > 0 && FilteredPersonalContact !== null) 
      {
          return NextResponse.json(
          {
             PersonalContactList: FilteredPersonalContact
          },
          {status: 200}
        )
      }
    }
    if(FindContactOwner === null) 
    {
      if(FilteredPersonalContact.length === 0 && FilteredPersonalContact === null && ChekContactOwnerId[0].MyId !== null) 
      {
        return NextResponse.json({error: "Kontak pribadi kosong!"}, {status: 400})
      }
    }
}