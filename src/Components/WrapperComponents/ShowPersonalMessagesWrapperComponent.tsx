"use client"

import React, { useEffect } from 'react'
import useSWR from "swr"
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { pusherClient } from '@/lib/pusher'

interface PersonalMessageProperties 
{
    PersonalMessageRecipientId: string
    PersonalMessageField: string
    PersonalChatOwnerId: string
}

interface PageProps 
{
    params:
    { 
      Contact_Id: string
      NamePersonalContact: string
      FriendsContactId: string
      PersonalMessageSenderId: string
      PersonalMessageReceiverId: string
    }
}

const ShowPersonalMessagesWrapperComponent = ({params} : PageProps) => {
  const [PersonalMessagesFriendId, setPersonalMessagesFriendId] = useState<string>("")
  const [PersonalMessagesText, setPersonalMessagesText] = useState<string>("")
  const [PersonalMessagesId, setPersonalMessagesId] = useState<string>("")
  const [AllPersonalMessages, setAllPersonalMessages] = useState<any[]>([])

  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const session = useSession()

  useEffect(() => 
  { 
    async function FetchPersonalMessages(): Promise<void> 
    {
      try 
      {
        const FetchPersonalMessageResponse = await fetch(`/api/chat/showpersonalmessages/${params.Contact_Id}`)
        const FetchPersonalMessageData = await FetchPersonalMessageResponse.json() as PersonalMessageProperties
        if(!FetchPersonalMessageResponse.ok || FetchPersonalMessageResponse.status !== 200) 
        {
          throw new Error("Gagal mengambil pesan pribadi")
        }
        setPersonalMessagesId(FetchPersonalMessageData.PersonalChatOwnerId)
        // setPersonalMessagesText(FetchPersonalMessageData.PersonalMessageField)
        const channelName = `Personal-Messages-Id-${params.Contact_Id}`
        const channel = pusherClient.subscribe(channelName)
        const HanndlePersonalMessages = () => 
        {
          // setAllPersonalMessages((prev) => [...prev, data]) 
          setPersonalMessagesText(FetchPersonalMessageData.PersonalMessageField)
          // console.log(FetchPersonalMessageData.PersonalMessageField)
        }
        channel.unbind("Mengirim pesan pribadi", HanndlePersonalMessages)
        pusherClient.unsubscribe(channelName)
      } 
      catch (error) 
      {
        console.error(error)
      }
    }
    FetchPersonalMessages()
  }, [params.Contact_Id])

  return (
    <>
     {PersonalMessagesText.length > 0 ? 
     (
       <p className="text-white bg-cyan-700 rounded-md w-64 h-7 text-center">
         {PersonalMessagesText}
       </p>
     ) : 
     (
      <p></p>
     )} 
    </>
  )
}

export default ShowPersonalMessagesWrapperComponent
