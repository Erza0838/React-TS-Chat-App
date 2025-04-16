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
  const DisplayFlexSelectedPersonalContactRef = useRef<HTMLParagraphElement>(null)
  const [contacts, setContact] = useState<FlattenedContact[]>([])
  const [showPersonalContactState, setShowPersonalContact] = useState<boolean>(false)
  const [selectedContact, setSelectedContact] = useState<{
    SelectedContactId: string, 
    SelectedSavedContactName? : string
  } | null>(null)
  
  useEffect(() => 
  {
    async function FetchPersonalContact() 
    {
      try 
      {
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


  function ShowPersonalContact(SelectedContactId: string, SelectedSavedContactName: string) 
  {
    setSelectedContact({SelectedContactId: SelectedContactId,SelectedSavedContactName: SelectedSavedContactName})
    setShowPersonalContact(!showPersonalContactState)
    // if(DisplayFlexSelectedPersonalContactRef.current) 
    // { 
    //   console.log(DisplayFlexSelectedPersonalContactRef.current.style.display)
    //   DisplayFlexSelectedPersonalContactRef.current.style.display = "flex"
    // }
  }

  return (
      <div className="flex flex-row">
        <SidebarWrapperComponent />
        <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16 no-scroll-bar">
            <div className="flex flex-col gap-4 mx-3 my-6">
                <h4 className="text-zinc-400 font-bold">Obrolan</h4>
                <SearchContactWrapperComponent/>
                <div className="flex flex-col my-5 gap-6">
                {Array.isArray(contacts) && contacts.length > 0 ? (
                  <ul className="flex flex-col gap-6">
                    {contacts.map((info, index) => (
                      <li key={info.ContactId} className="text-white cursor-pointer">
                        {info.SavedContactName ? (
                          <p onClick={() => ShowPersonalContact(info.ContactId, info.SavedContactName!)} className="underline underline-offset-4">
                            {info.SavedContactName}
                          </p>
                        ) : (
                          <p onClick={() => ShowPersonalContact(info.ContactId, info.SavedContactName!)} className="underline underline-offset-4">
                            {info.ContactId}
                          </p>
                        )}
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
            SavedContactName: selectedContact?.SelectedSavedContactName!
          }}/>
        </div>
        ) : (
          <div className="mx-72 hidden flex-row">
            <DisplayPersonalContactComponent params=
            {{
              ContactId: selectedContact?.SelectedContactId!,
              SavedContactName: selectedContact?.SelectedSavedContactName!
            }}/>
        </div>
        )}
      </div>
    )
}