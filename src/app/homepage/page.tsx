import { SidebarComponents } from "@/Components/SidebarComponents"
import SearchContactComponent from "@/Components/SearchContactComponent"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import ShowPersonalContactPageComponent from "@/Components/ContactListComponent"
import PersonalChatPage from "../chatpage/personalchat/[chatid]/page"
import PersonalContactWrapper from "@/Components/WrapperComponents/PersonalChatWrapperComponent"

interface ContactInfo 
{
  ContactInformation: string
  ContactId: string
  SavedContactName: string
}

export default async function Home() 
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
      MyId: true
    }
 })

 const contacts = ChekContactOwnerId.flatMap((contact) => 
 {
    const contactInfoArray = Array.isArray(contact.ContactInformation) ? (contact.ContactInformation as unknown as ContactInfo[]) : []  
    return contactInfoArray.map(info => 
    ({
        Contactid: info.ContactId,
        SavedContact: info.SavedContactName, // Assuming SavedContactId can be derived from ContactId
        ...info
    }))
 })

  return (
      <div className="flex flex-row">
        <SidebarComponents></SidebarComponents>
        <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16">
            <div className="flex flex-col gap-4 mx-3 my-6">
                <h4 className="text-zinc-400 font-bold">Obrolan</h4>
                <SearchContactComponent></SearchContactComponent>
                <div className="flex flex-col my-5 gap-6">
                {FindContactOwner ? (
                  // <ShowPersonalContactPageComponent contacts={contacts} />
                  <PersonalContactWrapper contacts={contacts}></PersonalContactWrapper>
                 ) : (
                  <p className="text-white">Kontak Kosong</p>
                 )
               }
                {/* {FindContactOwner ? (
                  <ul className="flex flex-col gap-2">
                    {ChekContactOwnerId.map(contact => 
                    {
                     const contactInfoArray = Array.isArray(contact.ContactInformation) ? (contact.ContactInformation as unknown as ContactInfo[]) : []
                     return contactInfoArray.map(info => 
                     (
                       <li key={info.ContactId} className="text-white cursor-pointer">
                         {info.SavedContactName ? 
                         (
                          <p className="underline underline-offset-4">{info.SavedContactName}</p> 
                         ) :
                          (<p className="underline underline-offset-4">{info.ContactId}</p>)}
                       </li>
                     ))
                    })}
                  </ul>) :
                   (<p className="text-white">Kontak kosong</p>)
                } */}
                </div>
            </div>
          </div>
          <PersonalChatPage></PersonalChatPage>
      </div>
    )
}