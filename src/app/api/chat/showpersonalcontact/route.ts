import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface ContactInformationProperties 
{
  ContactId: string
  SavedContactName?: string
}

interface PersonalContactInterace 
{
  // ContactId: string
  // SavedContactName?: string
  // MyId: string
  Contact_Id: string
  NamePersonalContactEnhancer: string
  IdPersonalContactEnhancer: string
  NamePersonalContactReceiver: string
  IdPersonalContactReceiver: string
  ItsFriend: boolean
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

    const CheckIdPersonalContactEnhancer = await prisma.user_Contacts.findMany(
    {
      where: 
      { 
        IdPersonalContactEnhancer: session?.user.id!,
        // IdPersonalContactReceiver: session?.user.id!,
        ItsFriend: true
      },
      select: 
      {
        ContactInformation: true,
        Contact_Id: true, 
        NamePersonalContactEnhancer: true,
        IdPersonalContactEnhancer: true,
        NamePersonalContactReceiver: true,
        IdPersonalContactReceiver: true,
        ItsFriend: true
      }
    })

    const CheckIdPersonalContactReceiver = await prisma.user_Contacts.findMany(
    {
      where: 
      { 
        IdPersonalContactReceiver: session?.user.id!,
        ItsFriend: true
      },
      select: 
      {
        ContactInformation: true,
        Contact_Id: true, 
        NamePersonalContactReceiver: true,
        IdPersonalContactReceiver: true,
        ItsFriend: true
      }
    })

    const FilteredPersonalContact = CheckIdPersonalContactEnhancer.flatMap(PersonalContact => 
    {
      const MyPersonalContact = PersonalContact.ContactInformation as unknown as Array<PersonalContactInterace>
      if(IsPersonalContactArray(MyPersonalContact)) 
      {
        return MyPersonalContact.filter(PersonalContactData => PersonalContactData.Contact_Id !== null && PersonalContact.IdPersonalContactEnhancer !== null).map((AllPersonalContactData) => 
        ({
          IdPersonalContactEnhancer: PersonalContact.IdPersonalContactEnhancer,
          NamePersonalContactEnhancer: PersonalContact.NamePersonalContactEnhancer,
          NamePersonalContactReceiver: PersonalContact.NamePersonalContactReceiver,
          IdPersonalContactReceiver: PersonalContact.IdPersonalContactReceiver,
          Contact_Id: PersonalContact.Contact_Id,
          ItsFriend: PersonalContact.ItsFriend
        }))
      }
      return []
    })
    
    if(FilteredPersonalContact[0].IdPersonalContactEnhancer === session?.user.id && FilteredPersonalContact[0].ItsFriend === true) 
    {
      console.log("ID penambnah kontak pribadi : " + JSON.stringify(FilteredPersonalContact[0].IdPersonalContactEnhancer))
      console.log("Nama penambnah kontak pribadi : " + JSON.stringify(FilteredPersonalContact[0].NamePersonalContactEnhancer))
    }

    // if(FilteredPersonalContact[0].IdPersonalContactReceiver === session?.user.id && FilteredPersonalContact[0].ItsFriend === true) 
    // {
    //   console.log("ID penerima kontak pribadi : " + JSON.stringify(FilteredPersonalContact[0].IdPersonalContactReceiver))
    //   console.log("Nama penerima kontak pribadi : " + JSON.stringify(FilteredPersonalContact[0].NamePersonalContactReceiver))
    // }

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
      if(FilteredPersonalContact.length === 0 && FilteredPersonalContact === null) 
      {
        return NextResponse.json({error: "Kontak pribadi kosong!"}, {status: 400})
      }
    }
}