"use client"

import React, { useEffect } from 'react'
import useSWR from "swr"
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface PersonalMessageProperties 
{
    PersonalMessageRecipientId: string
    PersonalMessageField: string
    PersonalChatOwnerId: string
    // PersonalContactOwnerId: string
    // PersonalMessageId: string
}

interface PageProps 
{
    params:
    {
        PersonalMessageRecipientId: string
        PersonalMessageSenderId: string
        // PersonalChatOwnerId: string
        ContactId: string
    }
}

const ShowPersonalMessagesWrapperComponent = ({params} : PageProps) => {
  const [PersonalMessagesFriendId, setPersonalMessagesFriendId] = useState<string>("")
  const [PersonalMessagesText, setPersonalMessagesText] = useState<string>("")
  const [PersonalMessagesId, setPersonalMessagesId] = useState<string>("")
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const session = useSession()

  useEffect(() => 
  {
    async function FetchPersonalMessages(): Promise<void> 
    {
      try 
      {
        // const response = await fetch("/api/chat/showpersonalcontact")
        // const FetchPersonalContactList = await response.json() as PersonalApiContactPropertyResponse
        const FetchPersonalMessageResponse = await fetch("/api/chat/showpersonalmessages")
        const FetchPersonalMessageData: PersonalMessageProperties = await FetchPersonalMessageResponse.json()
        if(!FetchPersonalMessageResponse.ok || FetchPersonalMessageResponse.status !== 200) 
        {
          throw new Error("Gagal mengambil pesan pribadi")
        }
        setPersonalMessagesId(FetchPersonalMessageData.PersonalChatOwnerId)
        setPersonalMessagesText(FetchPersonalMessageData.PersonalMessageField)
      } 
      catch (error) 
      {
        console.error(error)
      }
    }
    FetchPersonalMessages()
  }, [])
  

  return (
    <>
     {/* {params.PersonalMessageSenderId === session.data?.user.id && PersonalMessagesId === params.PersonalChatOwnerId ? (  */}
     {params.PersonalMessageSenderId === session.data?.user.id && PersonalMessagesText.length > 0 ? ( 
        <p className="text-white bg-cyan-700 rounded-md w-64 h-7 text-center">
          {PersonalMessagesText}
        </p>
        ) : (<p></p>)} 
    </>
  )
}

export default ShowPersonalMessagesWrapperComponent
