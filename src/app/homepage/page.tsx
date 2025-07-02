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
  NamePersonalContactEnhancer?: string,
  NamePersonalContactReceiver?: string,
  IdPersonalContactEnhancer: string,
  IdPersonalContactReceiver: string,
  // SelectedContactId: string,
  Contact_Id: string,
  // ItsFriend: boolean
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
  const [PersonalcontactsReciever, setPersonalContactReciever] = useState<{ 
    NamePersonalContactReceiver: string,
    IdPersonalContactReceiver: string,
    IdPersonalContactEnhancer: string,
    NamePersonalContactEnhancer: string,
    Contact_Id: string
    // ItsFriend: boolean
  }[]>([])
  const [selectedContact, setSelectedContact] = useState<{ 
    NamePersonalContactReceiver: string,
    IdPersonalContactReceiver: string,
    IdPersonalContactEnhancer: string,
    NamePersonalContactEnhancer: string,
    Contact_Id: string
    // ItsFriend: boolean
  } | null>(null)
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
                return {
                  NamePersonalContactReceiver: PersonalContactData.NamePersonalContactReceiver,
                  IdPersonalContactReceiver: PersonalContactData.IdPersonalContactReceiver,
                  IdPersonalContactEnhancer: PersonalContactData.IdPersonalContactEnhancer,
                  NamePersonalContactEnhancer: PersonalContactData.IdPersonalContactEnhancer,
                  Contact_Id: PersonalContactData.Contact_Id
                  // ItsFriend: PersonalContactData.ItsFriend
                }
              }
              if(PersonalContactData.IdPersonalContactReceiver && session?.user?.id && 
                 PersonalContactData.IdPersonalContactEnhancer !== session.user.id && 
                 PersonalContactData.ItsFriend === true && 
                 PersonalContactData.IdPersonalContactReceiver === session.user.id) 
              { 
                return {
                  NamePersonalContactReceiver: PersonalContactData.NamePersonalContactReceiver,
                  IdPersonalContactReceiver: PersonalContactData.IdPersonalContactReceiver,
                  IdPersonalContactEnhancer: PersonalContactData.IdPersonalContactEnhancer,
                  NamePersonalContactEnhancer: PersonalContactData.NamePersonalContactEnhancer,
                  Contact_Id: PersonalContactData.Contact_Id
                  // ItsFriend: PersonalContactData.ItsFriend
                }
              }
                return null
              })
              .filter( (contact): contact is 
              { 
                NamePersonalContactReceiver: string, 
                IdPersonalContactReceiver: string,
                IdPersonalContactEnhancer: string,
                NamePersonalContactEnhancer: string,
                Contact_Id: string
                // ItsFriend: boolean
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
    SelectedReceiverContactName: string, 
    SelectedReceiverContactId: string, 
    SelectedEnhancerContactName: string, 
    SelectedEnhancerContactId: string, 
    SelectedContactId: string
  ) 
  {
    setSelectedContact(
    {
      NamePersonalContactReceiver: SelectedReceiverContactName,
      IdPersonalContactReceiver: SelectedReceiverContactId,
      NamePersonalContactEnhancer: SelectedEnhancerContactName,
      IdPersonalContactEnhancer: SelectedEnhancerContactId,
      Contact_Id: SelectedContactId, 
    })
    setContacts(true)
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
                      <li key={PersonalContactInfo.Contact_Id} className="text-white cursor-pointer">
                        {
                         PersonalContactInfo.IdPersonalContactEnhancer === session?.user.id && 
                         PersonalContactInfo.IdPersonalContactReceiver !== session.user.id ? (
                          <p onClick={() => 
                          {
                            ShowPersonalContact(
                              PersonalContactInfo.NamePersonalContactReceiver,
                              PersonalContactInfo.IdPersonalContactReceiver, 
                              PersonalContactInfo.NamePersonalContactEnhancer,
                              PersonalContactInfo.IdPersonalContactEnhancer,
                              PersonalContactInfo.Contact_Id,
                            )
                          }
                          }>
                            {PersonalContactInfo.NamePersonalContactReceiver}
                          </p>
                        ) : (
                           <p onClick={() => 
                          {
                            ShowPersonalContact(
                              PersonalContactInfo.NamePersonalContactEnhancer,
                              PersonalContactInfo.IdPersonalContactEnhancer,
                              PersonalContactInfo.NamePersonalContactReceiver,
                              PersonalContactInfo.IdPersonalContactReceiver,
                              PersonalContactInfo.Contact_Id,
                             )}
                            }>
                              {PersonalContactInfo.NamePersonalContactEnhancer}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
        </div>
        {
          Contacs === true ? (
          <div className="mx-72 flex flex-row">
            {
              selectedContact?.IdPersonalContactEnhancer === session?.user.id && 
              selectedContact?.IdPersonalContactReceiver !== session?.user.id ? (
                <DisplayPersonalContactComponent params=
                {{
                  Contact_Id: selectedContact?.Contact_Id!,
                  NamePersonalContact: selectedContact?.NamePersonalContactReceiver!, 
                  FriendsContactId: selectedContact?.NamePersonalContactEnhancer!,
                  PersonalMessageReceiverId: selectedContact?.IdPersonalContactReceiver!
                }}/>
              ) : (
                <DisplayPersonalContactComponent params=
                {{
                  Contact_Id: selectedContact?.Contact_Id!,
                  NamePersonalContact: selectedContact?.NamePersonalContactEnhancer!, 
                  FriendsContactId: selectedContact?.NamePersonalContactReceiver!,
                  PersonalMessageReceiverId: selectedContact?.IdPersonalContactEnhancer!
                }}/>
              )
             }
          </div>
        ) : (
          <div className="mx-72 hidden flex-row">
            <DisplayPersonalContactComponent params=
            {{
              Contact_Id: selectedContact?.Contact_Id!,
              NamePersonalContact: selectedContact?.NamePersonalContactEnhancer!, 
              FriendsContactId: selectedContact?.Contact_Id!,
              PersonalMessageReceiverId: selectedContact?.IdPersonalContactReceiver!
            }}/>
          </div>
        )}
      </div>
    )
}