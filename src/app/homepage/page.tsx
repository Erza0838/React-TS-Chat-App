"use client"
import { useEffect, useState,useRef } from "react"
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


interface ContactInfoEntry 
{
  MyId: string
  // PersonalMessageId: string
  ContactId: string
  PersonalChatOwnerId: string
  SavedContactName?: string
  PersonalContactList: string
}

// interface ContactInfo 
// {
//   ContactInformation: ContactInfoEntry[]
// }

interface FlattenedContact 
{ 
  // Contact_Id: string
  ContactId: string
  PersonalMessageId: string
  PersonalChatOwnerId: string
  SavedContactName?: string
  // PersonalContactList: string
}

export default function Home() 
{ 
  const [contacts, setContact] = useState<FlattenedContact[]>([])
  // const [contacts, setContact] = useState<string>()
  const [showPersonalContactState, setShowPersonalContact] = useState<boolean>(false)
  const [selectedContact, setSelectedContact] = useState<{
    SelectedContactId: string, 
    SelectedPersonalContactId: string
    SelectedSavedNameContact: string
  } | null>(null)
  

  useEffect(() => 
  {
    async function FetchPersonalContact() 
    {
      try 
      {
          const response = await fetch("/api/chat/showpersonalcontact")
          const FetchPersonalContactList: ContactInfoEntry = await response.json()
          if(!response.ok) 
          {
            throw new Error("Gagal mendapatkan data kontak")
          }
          if(response.ok) 
          {
            // const flattened = data.map((item) => 
            // {
            //   const info = item.ContactInformation[0]
            //   return {
            //     ContactId: info.ContactId,
            //     PersonalMessageId: info.PersonalMessageId,
            //     PersonalChatOwnerId: info.PersonalChatOwnerId,
            //     SavedContactName: info.SavedContactName
            //   }
            // })
            // console.log("Data api : " + typeof FetchPersonalContactList)
            console.log("Data api : " + JSON.stringify(FetchPersonalContactList.PersonalContactList))
          }
      } 
      catch (error) 
      {
        console.error(error) 
      }
    }
    FetchPersonalContact()
  }, [])

  function ShowPersonalContact(SelectedContactId: string, SelectedSavedContactName: string, SelectedPersonalContactId: string) 
  {
    setSelectedContact(
    {
      SelectedContactId: SelectedContactId,
      SelectedSavedNameContact: SelectedSavedContactName,
      SelectedPersonalContactId: SelectedPersonalContactId
    })
    setShowPersonalContact(!showPersonalContactState)
  }

  return (
      <div className="flex flex-row">
        <SidebarWrapperComponent />
        <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16 no-scroll-bar z-10">
            <div className="flex flex-col gap-4 mx-3 my-6">
                <h4 className="text-zinc-400 font-bold">Obrolan</h4>
                <SearchContactWrapperComponent/>
                <div className="flex flex-col my-5 gap-6">
                {Array.isArray(contacts) && contacts.length > 0 ? (
                  <ul className="flex flex-col gap-6">
                    {contacts.map((info) => (
                      <li key={info.ContactId} className="text-white cursor-pointer">
                        <p>
                          {info.ContactId}
                        </p>
                        {/* {
                          info.SavedContactName ? (
                          <p onClick={() => ShowPersonalContact(
                                                            info.ContactId, 
                                                            info.SavedContactName!, 
                                                            info.PersonalChatOwnerId)} className="underline underline-offset-4">
                            {info.SavedContactName}
                          </p>
                        ) : (
                          <p onClick={() => ShowPersonalContact(
                                                            info.ContactId, 
                                                            info.SavedContactName!, 
                                                            info.PersonalChatOwnerId)} className="underline underline-offset-4">
                            {info.ContactId}
                          </p>
                        )} */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white">Kontak kosong</p>
                )}
                </div>
            </div>
        </div>
        
        {showPersonalContactState ? (
          <div className="mx-72 flex flex-row">
            <DisplayPersonalContactComponent params=
            {{
              ContactId: selectedContact?.SelectedContactId!,
              SavedContactName: selectedContact?.SelectedSavedNameContact!, 
              PersonalchatOwnerId: selectedContact?.SelectedPersonalContactId!
            }}/>
          </div>
        ) : (
          <div className="mx-72 hidden flex-row">
            <DisplayPersonalContactComponent params=
            {{
              ContactId: selectedContact?.SelectedContactId!,
              SavedContactName: selectedContact?.SelectedSavedNameContact!, 
              PersonalchatOwnerId: selectedContact?.SelectedPersonalContactId!
            }}/>
          </div>
        )}
      </div>
    )
}

// Backup code ambil kontak dari api
//   useEffect(() => 
//   {
//     async function FetchPersonalContact() 
//     {
//       try 
//       {
//           const response = await fetch("/api/chat/showpersonalcontact")
//           if(!response.ok) 
//           {
//             throw new Error("Gagal mendapatkan data kontak")
//           }
//           if(response.ok) 
//           {
//             const data = await response.json()
//             const dataContacts: ContactInfo[] = data.contact || []
//             const flattened = dataContacts.map((item) => 
//             {
//               const info = item.ContactInformation[0]
//               return {
//                 ContactId: info.ContactId,
//                 PersonalMessageId: info.PersonalMessageId,
//                 PersonalChatOwnerId: info.PersonalChatOwnerId,
//                 SavedContactName: info.SavedContactName,
//                 // EKsperimen
//                 // Contact_Id: info.Contact_Id
//               }
//             })
//             setContact(flattened)
//           }
//       } 
//       catch (error) 
//       {
//         console.error(error) 
//       }
//     }
//     FetchPersonalContact()
//   }, [])

//   function ShowPersonalContact(SelectedContactId: string, SelectedSavedContactName: string, SelectedPersonalContactId: string) 
//   {
//     setSelectedContact(
//     {
//       SelectedContactId: SelectedContactId,
//       SelectedSavedNameContact: SelectedSavedContactName,
//       SelectedPersonalContactId: SelectedPersonalContactId
//     })
//     setShowPersonalContact(!showPersonalContactState)
//   }

//   return (
//       <div className="flex flex-row">
//         <SidebarWrapperComponent />
//         <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16 no-scroll-bar z-10">
//             <div className="flex flex-col gap-4 mx-3 my-6">
//                 <h4 className="text-zinc-400 font-bold">Obrolan</h4>
//                 <SearchContactWrapperComponent/>
//                 <div className="flex flex-col my-5 gap-6">
//                 {Array.isArray(contacts) && contacts.length > 0 ? (
//                   <ul className="flex flex-col gap-6">
//                     {contacts.map((info) => (
//                       <li key={info.ContactId} className="text-white cursor-pointer">
//                         {info.SavedContactName ? (
//                           <p onClick={() => ShowPersonalContact(
//                                                             info.ContactId, 
//                                                             info.SavedContactName!, 
//                                                             info.PersonalChatOwnerId)} className="underline underline-offset-4">
//                             {info.SavedContactName}
//                           </p>
//                         ) : (
//                           <p onClick={() => ShowPersonalContact(
//                                                             info.ContactId, 
//                                                             info.SavedContactName!, 
//                                                             info.PersonalChatOwnerId)} className="underline underline-offset-4">
//                             {info.ContactId}
//                           </p>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-white">Kontak kosong</p>
//                 )}
//                 </div>
//             </div>
//         </div>
        
//         {showPersonalContactState ? (
//           <div className="mx-72 flex flex-row">
//             <DisplayPersonalContactComponent params=
//             {{
//               ContactId: selectedContact?.SelectedContactId!,
//               SavedContactName: selectedContact?.SelectedSavedNameContact!, 
//               PersonalchatOwnerId: selectedContact?.SelectedPersonalContactId!
//             }}/>
//           </div>
//         ) : (
//           <div className="mx-72 hidden flex-row">
//             <DisplayPersonalContactComponent params=
//             {{
//               ContactId: selectedContact?.SelectedContactId!,
//               SavedContactName: selectedContact?.SelectedSavedNameContact!, 
//               PersonalchatOwnerId: selectedContact?.SelectedPersonalContactId!
//             }}/>
//           </div>
//         )}
//       </div>
//     )
// }