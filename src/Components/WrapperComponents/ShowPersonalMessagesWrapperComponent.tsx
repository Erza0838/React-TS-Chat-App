"use client"

import React, { useEffect } from 'react'
import useSWR from "swr"
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { ifError } from 'assert'

interface PersonalMessageProperties 
{
    PersonalMessageRecipientId: string
    PersonalMessageField: string
    PersonalContactOwnerId: string
}

interface PageProps 
{
    params:
    {
        PersonalMessageRecipientId: string
        PersonalMessageSenderId: string
        ContactId: string
    }
}

const ShowPersonalMessagesWrapperComponent = ({params} : PageProps) =>
{
  // const [PersonalMessagesFriendId, setPersonalMessagesFriendId] = useState<string>("")
  const [PersonalMessagesText, setPersonalMessagesText] = useState<string>("")
  const [PersonalMessagesOwnerId, setPersonalMessagesOwnerId] = useState<string>("")
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const session = useSession()

  useEffect(() => 
  {
    async function FetchPersonalMessages(): Promise<void> 
    {
      try 
      {
        const FetchPersonalMessageResponse = await fetch("/api/chat/showpersonalmessages")
        if(!FetchPersonalMessageResponse.ok || FetchPersonalMessageResponse.status !== 200) 
        {
          throw new Error("Gagal mengambil pesan pribadi")
        }
        const FetchPersonalMessageData: PersonalMessageProperties = await FetchPersonalMessageResponse.json()
        setPersonalMessagesOwnerId(FetchPersonalMessageData.PersonalContactOwnerId)
        setPersonalMessagesText(FetchPersonalMessageData.PersonalMessageField)
      } 
      catch (error) 
      {
        console.error(error)
      }
    }
    FetchPersonalMessages()
  }, [])

  console.log("ID dari params : " + params.PersonalMessageSenderId)
  console.log("ID dari state : " + PersonalMessagesOwnerId)

  return (
    <>
     {params.PersonalMessageSenderId === session.data?.user.id && PersonalMessagesOwnerId === params.PersonalMessageSenderId ? ( 
        <p className="text-white bg-cyan-700 rounded-md w-64 h-7 text-center">
          {PersonalMessagesText}
        </p>
        ) : (<p></p>)} 
    </>
  )
}

export default ShowPersonalMessagesWrapperComponent
