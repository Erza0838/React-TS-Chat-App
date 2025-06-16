"use client"
import { useEffect, useState,useRef } from "react"
import DisplayPersonalContactComponent from "@/Components/DisplayPersonalContactComponent"
import SidebarWrapperComponent from "@/Components/WrapperComponents/SidebarWrapperComponent"
import SearchContactWrapperComponent from "@/Components/WrapperComponents/SearchContactWrapperComponent"
import { PersonalContactProperty } from "../Interface/PersonalChatPageInterface"
import { useSession } from "next-auth/react"
import { User } from "lucide-react"

interface PersonalContactStateObject
{
  ContactId: string
  SavedContactName?: string
  Contact_Id: string
}

interface PersonalContactState 
{
  PersonalContactList: PersonalContactStateObject[]
}

interface SelectedPersonalContact 
{
  IdPersonalContactEnhancer: string,
  NamePersonalContactEnhancer?: string,
  NamePersonalContactReceiver?: string,
  IdPersonalContactReceiver: string,
  Contact_Id: string,
  ItsFriend: boolean
}

interface FilteredPersonalContact
{
  IdPersonalContactEnhancer: string,
  NamePersonalContactEnhancer: string,
  NamePersonalContactReceiver: string,
  IdPersonalContactReceiver: string,
  Contact_Id: string,
  ItsFriend: boolean
}

interface ListPersonalContacts 
{
  PersonalContactList: FilteredPersonalContact[]
}

export default function Home() 
{ 
  const [Contacs, setContacts] = useState<boolean>(false)
  const [Personalcontacts, setPersonalContact] = useState<ListPersonalContacts[]>([])
  const [PersonalcontactsReciever, setPersonalContactReciever] = useState<{ 
    NamePersonalContactReceiver: string,
    IdPersonalContactReceiver: string,
    IdPersonalContactEnhancer: string,
    NamePersonalContactEnhancer: string,
    ItsFriend: boolean
  }[]>([])
  const [selectedContact, setSelectedContact] = useState<SelectedPersonalContact | null>(null)
  const {data: session, update} = useSession()
  useEffect(() => 
  {
    if(!session?.user.id) 
    {
      return 
    }
    async function FetchPersonalContact() 
    {
      try 
      {
          const response = await fetch("/api/chat/showpersonalcontact")
          const FetchPersonalContactList = await response.json() as ListPersonalContacts
          if(!response.ok) 
          {
            throw new Error("Gagal mendapatkan data kontak")
          }
          if(response.ok) 
          { 
            const ShowPersonalContacts = FetchPersonalContactList.PersonalContactList.map((PersonalContactData) => 
            {
              if(PersonalContactData.IdPersonalContactEnhancer && session?.user?.id && 
                 PersonalContactData.IdPersonalContactEnhancer === session.user.id && 
                 PersonalContactData.ItsFriend === true && 
                 PersonalContactData.IdPersonalContactReceiver !== session.user.id) 
              {
                console.log("Penambah kontak : " + PersonalContactData.NamePersonalContactReceiver)
                // return {
                //   NamePersonalContactReceiver: PersonalContactData.NamePersonalContactReceiver,
                //   IdPersonalContactReceiver: PersonalContactData.IdPersonalContactReceiver,
                //   IdPersonalContactEnhancer: PersonalContactData.IdPersonalContactEnhancer,
                //   NamePersonalContactEnhancer: PersonalContactData.IdPersonalContactEnhancer,
                //   // ItsFriend: PersonalContactData.ItsFriend
                // }
              }
              if(PersonalContactData.IdPersonalContactEnhancer && session?.user?.id && 
                 PersonalContactData.IdPersonalContactEnhancer !== session.user.id && 
                 PersonalContactData.ItsFriend === true && 
                 PersonalContactData.IdPersonalContactReceiver === session.user.id) 
              { 
                console.log("Penambah kontak : " + PersonalContactData.NamePersonalContactEnhancer)
                // return {
                //   NamePersonalContactReceiver: PersonalContactData.NamePersonalContactReceiver,
                //   IdPersonalContactReceiver: PersonalContactData.IdPersonalContactReceiver,
                //   IdPersonalContactEnhancer: PersonalContactData.IdPersonalContactEnhancer,
                //   NamePersonalContactEnhancer: PersonalContactData.IdPersonalContactEnhancer,
                //   // ItsFriend: PersonalContactData.ItsFriend
                // }
              }
                return null
              })
              .filter( (contact): contact is 
              { 
                NamePersonalContactReceiver: string, 
                IdPersonalContactReceiver: string,
                IdPersonalContactEnhancer: string,
                NamePersonalContactEnhancer: string,
                ItsFriend: boolean
              } => contact !== null)
            setPersonalContactReciever(ShowPersonalContacts)
          }
      } 
      catch (error) 
      {
        console.error(error) 
      }
    }
    FetchPersonalContact()
  }, [session?.user.id])

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
                  <ul className="flex flex-col gap-6">
                    {PersonalcontactsReciever.map((PersonalContactInfo) => (
                      <li key={PersonalContactInfo.IdPersonalContactReceiver} className="text-white cursor-pointer">
                        {PersonalContactInfo.IdPersonalContactEnhancer === session?.user.id && PersonalContactInfo.IdPersonalContactReceiver !== session?.user.id ? (
                          <p className="underline underline-offset-4">
                            {PersonalContactInfo.NamePersonalContactReceiver}
                          </p>
                        ) : (
                          <p className="underline underline-offset-4">
                            {PersonalContactInfo.NamePersonalContactEnhancer}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                {/* {Personalcontacts !== null ? (
                  <ul className="flex flex-col gap-6">
                    {Personalcontacts.map((ContactsInfo) => (
                      <li key={ContactsInfo.PersonalContactList[0].Contact_Id} className="text-white cursor-pointer">
                        {ContactsInfo.PersonalContactList[0].SavedContactName ? (
                          <p onClick={() => 
                          {
                            ShowPersonalContact(
                              ContactsInfo.PersonalContactList[0].ContactId, 
                              ContactsInfo.PersonalContactList[0].SavedContactName!, 
                              ContactsInfo.PersonalContactList[0].Contact_Id
                             )}
                            } className="underline underline-offset-4">
                            {ContactsInfo.PersonalContactList[0].NamePersonalContactReceiver}
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
                  </ul>) : (<p className="text-white">Kontak kosong</p>)} */}
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