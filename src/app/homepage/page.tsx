"use client"
import { useEffect, useState,useRef } from "react"
import DisplayPersonalContactComponent from "@/Components/DisplayPersonalContactComponent"
import SidebarWrapperComponent from "@/Components/WrapperComponents/SidebarWrapperComponent"
import SearchContactWrapperComponent from "@/Components/WrapperComponents/SearchContactWrapperComponent"
import { PersonalContactProperty } from "../Interface/PersonalChatPageInterface"

interface PersonalContactState 
{
  PersonalContactList: PersonalContactStateObject[]
}

interface PersonalContactStateObject
{
  ContactId: string
  SavedContactName?: string
  Contact_Id: string
}

interface SelectedPersonalContact 
{
  ContactId: string
  SavedContactName?: string
  Contact_Id: string
}

export default function Home() 
{ 
  const [Contacs, setContacts] = useState<boolean>(false)
  const [Personalcontacts, setPersonalContact] = useState<PersonalContactState[]>([])
  const [selectedContact, setSelectedContact] = useState<SelectedPersonalContact | null>(null)

  useEffect(() => 
  {
    async function FetchPersonalContact() 
    {
      try 
      {
          const response = await fetch("/api/chat/showpersonalcontact")
          const FetchPersonalContactList = await response.json() as PersonalContactProperty
          if(!response.ok) 
          {
            throw new Error("Gagal mendapatkan data kontak")
          }
          if(response.ok) 
          { 
            const ShowPersonalContactList = FetchPersonalContactList.PersonalContactList.map((PersonalContactInfo) =>
            {
              return {
                PersonalContactList: 
                [
                  {
                    ContactId: PersonalContactInfo.ContactId, 
                    SavedContactName: PersonalContactInfo.SavedContactName, 
                    Contact_Id: PersonalContactInfo.Contact_Id, 
                  }
                ]
              }  
            })
            setPersonalContact(ShowPersonalContactList)
          }
      } 
      catch (error) 
      {
        console.error(error) 
      }
    }
    FetchPersonalContact()
  }, [])

  function ShowPersonalContact(
    SelectedContactId: string, 
    SelectedSavedContactName: string, 
    SelectedPersonalContactOwnerId: string
  ) 
  {
    setSelectedContact(
    {
      ContactId: SelectedContactId, 
      SavedContactName: SelectedSavedContactName,
      Contact_Id: SelectedPersonalContactOwnerId
    })
    setContacts(!Contacs)
  }

  return (
      <div className="flex flex-row">
        <SidebarWrapperComponent />
        <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16 no-scroll-bar z-10">
            <div className="flex flex-col gap-4 mx-3 my-6">
                <h4 className="text-zinc-400 font-bold">Obrolan</h4>
                <SearchContactWrapperComponent/>
                <div className="flex flex-col my-5 gap-6">
                {Personalcontacts !== null ? (
                  <ul className="flex flex-col gap-6">
                    {Personalcontacts.map((ContactsInfo) => (
                      <li key={ContactsInfo.PersonalContactList[0].ContactId} className="text-white cursor-pointer">
                        {ContactsInfo.PersonalContactList[0].SavedContactName ? (
                          <p onClick={() => 
                          {
                            ShowPersonalContact(
                              ContactsInfo.PersonalContactList[0].ContactId, 
                              ContactsInfo.PersonalContactList[0].SavedContactName!, 
                              ContactsInfo.PersonalContactList[0].Contact_Id
                             )}
                            } className="underline underline-offset-4">
                            {ContactsInfo.PersonalContactList[0].SavedContactName}
                          </p>
                        ) : (
                           <p onClick={() => 
                          {
                            ShowPersonalContact(
                              ContactsInfo.PersonalContactList[0].ContactId, 
                              ContactsInfo.PersonalContactList[0].SavedContactName!, 
                              ContactsInfo.PersonalContactList[0].Contact_Id
                             )}
                            } className="underline underline-offset-4">
                            {ContactsInfo.PersonalContactList[0].ContactId}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>) : (<p className="text-white">Kontak kosong</p>)}
                </div>
            </div>
        </div>
        
        {Contacs === true ? (
          <div className="mx-72 flex flex-row">
            <DisplayPersonalContactComponent params=
            {{
              ContactId: selectedContact?.ContactId!,
              SavedContactName: selectedContact?.SavedContactName!, 
              PersonalcontactOwnerId: selectedContact?.Contact_Id!
            }}/>
          </div>
        ) : (
          <div className="mx-72 hidden flex-row">
            <DisplayPersonalContactComponent params=
            {{
              ContactId: selectedContact?.ContactId!,
              SavedContactName: selectedContact?.SavedContactName!, 
              PersonalcontactOwnerId: selectedContact?.Contact_Id!
            }}/>
          </div>
        )}
      </div>
    )
}