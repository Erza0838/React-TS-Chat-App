"use client"
import { useEffect, useState } from "react"
import { SidebarComponents } from "@/Components/SidebarComponents"
import SearchContactComponent from "@/Components/SearchContactComponent"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import ShowPersonalContactPageComponent from "@/Components/ContactListComponent"
import PersonalContactWrapper from "@/Components/WrapperComponents/PersonalChatWrapperComponent"
import DisplayPersonalChatWrapperComponent from "@/Components/WrapperComponents/DisplayPersonalChatWrapperComponent"
import DisplayPersonalContactComponent from "@/Components/DisplayPersonalContactComponent"
import SidebarWrapperComponent from "@/Components/WrapperComponents/SidebarWrapperComponent"
import SearchContactWrapperComponent from "@/Components/WrapperComponents/SearchContactWrapperComponent"
import router from "next/navigation"

interface ContactInfoEntry 
{
  ContactId: string
  SavedContactName?: string
}

interface ContactInfo 
{
  ContactInformation: ContactInfoEntry[]
}

interface FlattenedContact 
{
  ContactId: string;
  SavedContactName?: string;
}

// export default async function Home() 
export default function Home() 
{ 
//  const session = await getServerSession(authOptions)
//  const FindContactOwner = await prisma.userModel.findFirst(
//  {
//     where: 
//     {
//         id: session?.user.id ?? ""
//     }
//  })

//  const ChekContactOwnerId = await prisma.user_Contacts.findMany(
//  {
//     where: 
//     {
//       MyId: 
//       {
//         equals: session?.user.id ?? ""
//       }
//     },
//     select: 
//     {
//       ContactInformation: true,
//       MyId: true
//     }
//  })

//  const contacts = ChekContactOwnerId.flatMap((contact) => 
//  {
//     // Assuming SavedContactId can be derived from ContactId
//     const contactInfoArray = Array.isArray(contact.ContactInformation) ? (contact.ContactInformation as unknown as ContactInfo[]) : []  
//     return contactInfoArray.map(info => 
//     ({
//         Contactid: info.ContactId,
//         SavedContact: info.SavedContactName, 
//         ...info
//     }))
//  })
const [contacts, setContact] = useState<FlattenedContact[]>([])
// const [contacts, setContact] = useState([])
useEffect(() => 
{
  async function FetchPersonalContact() 
  {
    try 
    {
      // const parsedData = JSON.parse(PersonalContactList.contact)
      // const ChekContactOwnerId = parsedData.map((contact: ContactInfo) => 
      // { 
      //     const contactInfoArray = Array.isArray(contact.ContactInformation) ? (contact.ContactInformation as unknown as ContactInfo[]) : []  
      //     return contactInfoArray.map(info => 
      //     ({
      //         Contactid: info.ContactId,
      //         SavedContact: info.SavedContactName, 
      //         ...info
      //     }))
      // })
      // setContact(ChekContactOwnerId)
        const response = await fetch("/api/chat/showpersonalcontact")
        if(!response.ok) 
        {
            throw new Error("Gagal mendapatkan data kontak")
        }
        if(response.ok) 
        {
          const data = await response.json()
          const dataContacts: ContactInfo[] = data.contact || []
          const flattened = dataContacts.map((item) => 
          {
            const info = item.ContactInformation[0]
            return {
              ContactId: info.ContactId,
              SavedContactName: info.SavedContactName,
            }
          })
          setContact(flattened)
        }
    } 
    catch (error) 
    {
      console.error(error) 
    }
  }
  FetchPersonalContact()
}, [])

  return (
      <div className="flex flex-row">
        <SidebarWrapperComponent />
        <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16 no-scroll-bar">
            <div className="flex flex-col gap-4 mx-3 my-6">
                <h4 className="text-zinc-400 font-bold">Obrolan</h4>
                <SearchContactWrapperComponent/>
                {/* <ShowPersonalContactPageComponent contacts={}/> */}
                {/* {FindContactOwner ? (
                  // <ShowPersonalContactPageComponent contacts={contacts}/>
                  <Link href={"/personalchat/" + contacts[0].Contactid}>
                    <PersonalContactWrapper contacts={contacts}/>
                  </Link>
                 ) : (
                  <p className="text-white">Kontak Kosong</p>
                 )
               } */}
                <div className="flex flex-col my-5 gap-6">
                {Array.isArray(contacts) && contacts.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {contacts.map((info, index) => (
                      <li key={info.ContactId} className="text-white cursor-pointer">
                        {info.SavedContactName ? (
                          <Link href={`/privatechat/${info.ContactId}`}>
                            <p className="underline underline-offset-4">{info.SavedContactName}</p>
                          </Link>
                        ) : (
                          <Link href={`/privatechat/${info.ContactId}`}>
                            <p className="underline underline-offset-4">{info.ContactId}</p>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white">Kontak kosong</p>
                )}
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
                              <Link href={`/privatechat/${info.ContactId }`}>
                                <p className="underline underline-offset-4">
                                  {info.SavedContactName}
                                </p> 
                              </Link> 
                          ) : (
                            <Link href={`/privatechat/${info.ContactId}`}>
                              <p className="underline underline-offset-4">
                                {info.ContactId}
                              </p>
                            </Link>
                            )}
                        </li>
                      ))
                    })}
                  </ul>) :
                   (<p className="text-white">Kontak kosong</p>)
                } */}
                </div>
            </div>
        </div>
        {/* <div className="flex flex-col ml-80">
        </div>  */}
      </div>
    )
}