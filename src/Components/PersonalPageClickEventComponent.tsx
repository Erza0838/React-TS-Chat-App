"use client"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import React, { createContext, FC, useContext, useState } from "react"
import TextareaAutoSize from "react-textarea-autosize"
import useSWR from "swr"
import ShowPersonalMessagesWrapperComponent from "./WrapperComponents/ShowPersonalMessagesWrapperComponent"

interface PageProps 
{
  params: 
  {
    ContactId: string
    SavedContactName: string
    PersonalMessageRecipientId: string
    PersonalMessageSenderId: string
    PersonalContactOwnerId: string
    // PersonalMessagesOwnerId: string
    // PersonalMessageId: string
  }
}

// interface SenderPersonalMessage 
// {
//   SenderPersonalMessageId: string
//   PersonalMessageText: string
//   SenderPersonalMessageName: string
// }

const PersonalChatPageComponent: FC<PageProps> = ({ params }: PageProps) =>
{ 
  const [selectedContact, setSelectedContact] = useState<{
    SelectedContactId: string, 
    SelectedSavedContactName? : string
  } | null>(null)
  const [Personalmessage, setPersonalMessage] = useState<string>("")
  const session = useSession()

  const HandlePersonalMessageText = (event: React.ChangeEvent<HTMLTextAreaElement>) => 
  {
    setPersonalMessage(event.target.value)
  }

  const SendPersonalMessage = async (event: React.FormEvent<HTMLFormElement>) => 
  {
      event.preventDefault()
      try 
      {
        const PersonalMessageData = await fetch("/api/chat/personalchat", 
        {
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            SenderMessageId: session.data?.user.id,
            MessageRecipientId: params.ContactId,
            SenderMessageContactName: params.SavedContactName,
            PersonalMessageText: Personalmessage, 
            PersonalContactOwnerId: params.PersonalContactOwnerId
          })
        })
        if(!PersonalMessageData.ok || PersonalMessageData.status !== 200) 
        {
          setPersonalMessage("") 
        }
        if(PersonalMessageData.ok || PersonalMessageData.status === 200) 
        {
          setPersonalMessage("") 
          const PersonalMessageResponse = await PersonalMessageData.json()
        }
      } 
      catch (error) 
      {
        console.error("Pesan pribadi error : " + error)
      }
  }

  return ( params.SavedContactName ? (
    <div className="flex flex-col mx-7"> 
      <div className="inline-block h-16 min-w-[1200%] bg-cyan-800">
        <p className="text-white mx-5 my-2">{params.SavedContactName}</p>
         <div className="-z-10 w-[80vw] h-[100vh] translate-y-5 -translate-x-1 md:overflow-y-auto bg-slate-900">
            <div className="flex flex-col gap-5 mx-8 my-6">
              {/* <ShowPersonalMessagesWrapperComponent params={{PersonalMessageRecipientId: params.ContactId, PersonalMessageSenderId: params.PersonalMessageSenderId}}/> */}
            {params.PersonalMessageSenderId && params.PersonalMessageSenderId == session.data?.user.id ? (
              <ShowPersonalMessagesWrapperComponent params=
              {{
                PersonalMessageRecipientId: params.PersonalMessageRecipientId, 
                PersonalMessageSenderId: params.PersonalMessageSenderId, 
                ContactId: params.ContactId, 
                PersonalChatOwnerId: params.PersonalContactOwnerId
                // PersonalMessageId: params.PersonalMessageId
              }}/>
            ) : ( <></> )}
            </div>
         </div>

        <form onSubmit={SendPersonalMessage} className="flex flex-row gap-11 absolute top-[90vh] min-w-[1100%] bg-cyan-800 h-16">
          <div className="flex flex-row gap-5 translate-x-8 translate-y-3">
            <TextareaAutoSize className="rounded-md h-16 focus:outline-none pl-6 resize-none"
                              placeholder="Ketik pesan"
                              value={Personalmessage}
                              onChange={HandlePersonalMessageText}/>
            <button className="bg-white rounded-md w-11 h-6">
              Kirim
            </button>
          </div>
        </form>

      </div>
    </div> 
  ) : (
    <div className="flex flex-col mx-6"> 
    <div className="inline-block h-14 min-w-[1200%] bg-cyan-800">
        <p className="text-white mx-5 my-2">{params.ContactId}</p>
        <div className="-z-10 w-[80vw] h-[100vh] translate-y-4 -translate-x-1 md:overflow-y-auto bg-slate-900">
            <div className="flex flex-col gap-5 mx-[48vw] my-6">
              {/* <ShowPersonalMessagesWrapperComponent params={{PersonalMessageRecipientId: params.ContactId, PersonalMessageSenderId: params.PersonalMessageSenderId}}/> */}
              {params.PersonalMessageSenderId && params.PersonalMessageSenderId == session.data?.user.id ? (
                <ShowPersonalMessagesWrapperComponent params=
                {{
                  PersonalMessageRecipientId: params.ContactId, 
                  PersonalMessageSenderId: params.PersonalMessageSenderId, 
                  ContactId: params.ContactId, 
                  PersonalChatOwnerId: params.PersonalContactOwnerId
                  // PersonalMessageId: params.PersonalMessageId
                }}/>
              ) : ( <></> )}
            </div>
         </div>

        <form onSubmit={SendPersonalMessage} className="flex flex-row gap-11 absolute top-[90vh] min-w-[1200%] bg-cyan-800 h-16">
          <div className="flex flex-row gap-5 translate-x-8 translate-y-3">
          <TextareaAutoSize className="rounded-md h-16 focus:outline-none pl-6 resize-none"
                            placeholder="Ketik pesan"
                            value={Personalmessage}
                            onChange={HandlePersonalMessageText}/>
            <button className="bg-white rounded-md w-11 h-6">
              Kirim
            </button>
          </div>
        </form>

      </div>
    </div> 
  ))  
}

export default PersonalChatPageComponent