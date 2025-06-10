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

    const CheckIdPersonalContactEnhancer = await prisma.user_Contacts.findMany(
    {
      where: 
      { 
        OR: 
        [
          {
            IdPersonalContactEnhancer: session?.user.id!
          },
          {
            IdPersonalContactReceiver: session?.user.id!
          }
        ],
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

    const FilteredPersonalContact = CheckIdPersonalContactEnhancer.map(PersonalContactData => 
    ({
          IdPersonalContactEnhancer: PersonalContactData.IdPersonalContactEnhancer,
          NamePersonalContactEnhancer: PersonalContactData.NamePersonalContactEnhancer,
          NamePersonalContactReceiver: PersonalContactData.NamePersonalContactReceiver,
          IdPersonalContactReceiver: PersonalContactData.IdPersonalContactReceiver,
          Contact_Id: PersonalContactData.Contact_Id,
          ItsFriend: PersonalContactData.ItsFriend
      }))
      console.log("Data kontak : " + JSON.stringify(FilteredPersonalContact))
      // const MyPersonalContact = PersonalContact as unknown as Array<PersonalContactInterace>
      // if(IsPersonalContactArray(MyPersonalContact)) 
      // { 
      //   return MyPersonalContact.map(PersonalContactData => 
      //   ({
      //     IdPersonalContactEnhancer: PersonalContactData.IdPersonalContactEnhancer,
      //     NamePersonalContactEnhancer: PersonalContactData.NamePersonalContactEnhancer,
      //     NamePersonalContactReceiver: PersonalContactData.NamePersonalContactReceiver,
      //     IdPersonalContactReceiver: PersonalContactData.IdPersonalContactReceiver,
      //     Contact_Id: PersonalContactData.Contact_Id,
      //     ItsFriend: PersonalContactData.ItsFriend
      //   }))
      // }
      // return []

    if(CheckIdPersonalContactEnhancer[0].IdPersonalContactEnhancer !== null && 
       CheckIdPersonalContactEnhancer[0].IdPersonalContactEnhancer === session?.user.id && 
       CheckIdPersonalContactEnhancer[0].ItsFriend === true) 
    {
      console.log("Kontak Id yang ditambahkan : " + JSON.stringify(FilteredPersonalContact[0].IdPersonalContactReceiver))
      console.log("Nama kontak yang ditambahkan : " + JSON.stringify(FilteredPersonalContact[0].IdPersonalContactReceiver))
    }
    if(CheckIdPersonalContactEnhancer[0].IdPersonalContactReceiver !== null && CheckIdPersonalContactEnhancer[0].IdPersonalContactReceiver === session?.user.id) 
    {
      console.log("ID penambah kontak : " + JSON.stringify(CheckIdPersonalContactEnhancer[0].IdPersonalContactEnhancer))
      console.log("Nama penambah kontak : " + JSON.stringify(CheckIdPersonalContactEnhancer[0].NamePersonalContactEnhancer))
    }

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