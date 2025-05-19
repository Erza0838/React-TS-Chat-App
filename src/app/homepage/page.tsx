"use client"
import { useEffect, useState,useRef } from "react"
import ShowPersonalContactPageComponent from "@/Components/ContactListComponent"
import PersonalContactWrapper from "@/Components/WrapperComponents/PersonalChatWrapperComponent"
import DisplayPersonalChatWrapperComponent from "@/Components/WrapperComponents/DisplayPersonalChatWrapperComponent"
import DisplayPersonalContactComponent from "@/Components/DisplayPersonalContactComponent"
import SidebarWrapperComponent from "@/Components/WrapperComponents/SidebarWrapperComponent"
import SearchContactWrapperComponent from "@/Components/WrapperComponents/SearchContactWrapperComponent"

interface PersonalContactProperty 
{
  ContactId: string
  SavedContactName?: string
  PersonalContactOwner: string
}

interface PersonalApiContactResponse 
{
  PersonalContactList: PersonalContactProperty[]
  PersonalContactOwnerId: string
}

interface PersonalApiContactPropertyResponse 
{
  PersonalContactDataList: PersonalApiContactResponse[]
}

interface SelectedPersonalContact 
{
  ContactId: string
  SavedContactName?: string
  PersonalContactOwner: string
}

export default function Home() 
{ 
  const [Contacs, setContacts] = useState<boolean>(false)
  const [Personalcontacts, setPersonalContact] = useState<PersonalContactProperty[]>([])
  const [selectedContact, setSelectedContact] = useState<SelectedPersonalContact | null>(null)

  useEffect(() => 
  {
    async function FetchPersonalContact() 
    {
      try 
      {
          const response = await fetch("/api/chat/showpersonalcontact")
          const FetchPersonalContactList = await response.json() as PersonalApiContactPropertyResponse
          console.log(FetchPersonalContactList)
          if(!response.ok) 
          {
            throw new Error("Gagal mendapatkan data kontak")
          }
          if(response.ok) 
          { 
            const ShowPersonalContactList = FetchPersonalContactList.PersonalContactDataList.map((PersonalContactInfo) => 
            { 
              return {
                ContactId: PersonalContactInfo.PersonalContactList[0].ContactId,
                SavedContactName: PersonalContactInfo.PersonalContactList[0].SavedContactName,
                Contact_Id: PersonalContactInfo.PersonalContactOwnerId, 
                PersonalContactOwner: PersonalContactInfo.PersonalContactOwnerId
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
      PersonalContactOwner: SelectedPersonalContactOwnerId
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
                      <li key={ContactsInfo.ContactId} className="text-white cursor-pointer">
                        {ContactsInfo.SavedContactName ? (
                          <p onClick={() => 
                          {
                            ShowPersonalContact(
                              ContactsInfo.ContactId, 
                              ContactsInfo.SavedContactName!, 
                              ContactsInfo.PersonalContactOwner
                             )}
                            } className="underline underline-offset-4">
                            {ContactsInfo.SavedContactName}
                          </p>
                        ) : (
                          <p onClick={() => ShowPersonalContact(
                                            ContactsInfo.ContactId, 
                                            ContactsInfo.SavedContactName!,
                                            ContactsInfo.PersonalContactOwner
                                      )} className="underline underline-offset-4">
                            {ContactsInfo.ContactId}
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
              PersonalcontactOwnerId: selectedContact?.PersonalContactOwner!
            }}/>
          </div>
        ) : (
          <div className="mx-72 hidden flex-row">
            <DisplayPersonalContactComponent params=
            {{
              ContactId: selectedContact?.ContactId!,
              SavedContactName: selectedContact?.SavedContactName!, 
              PersonalcontactOwnerId: selectedContact?.PersonalContactOwner!
            }}/>
          </div>
        )}
      </div>
    )
}