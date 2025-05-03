"use client"

import React, { useEffect } from 'react'
import useSWR from "swr"
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface PersonalMessageProperties 
{
    RecipientId: string
    PersonalMessageText: string
}

// interface PersonalMessagePropertieList 
// {
//   Properties: PersonalMessageProperties[]
// }

interface PageProps 
{
    params:
    {
        PersonalMessageRecipientId: string
        PersonalMessageSenderId: string
        // ContactId: string
    }
}

const ShowPersonalMessagesWrapperComponent = ({params} : PageProps) =>
{
  const [PersonalMessagesFriendId, setPersonalMessagesFriendId] = useState<string>("")
  const [PersonalMessagesText, setPersonalMessagesText] = useState<string>("")
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const session = useSession()
  // const { data, isLoading, isValidating, error } = useSWR<PersonalMessagePropertieList>(`/api/chat/showpersonalmessages`, 
  //       fetcher,
  //   {
  //       revalidateOnFocus: false, 
  //       revalidateOnReconnect: false
  //   })
  // console.log("Pesan pribadi : " + PersonalMessagesText)
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

        // setPersonalMessagesFriendId(FetchPersonalMessageData.PersonalMessageText)
        // console.log("API RESPONSE:", FetchPersonalMessageData.PersonalMessageText)
        setPersonalMessagesFriendId(FetchPersonalMessageData.RecipientId)
        setPersonalMessagesText(FetchPersonalMessageData.PersonalMessageText)
        console.log("API RESPONSE:", FetchPersonalMessageData.RecipientId)
      } 
      catch (error) 
      {
        console.error(error)
      }
      // return []
    }
    FetchPersonalMessages()
  }, [])

  return (
    <>
     {/* {params.PersonalMessageSenderId == session.data?.user.id && params.PersonalMessageRecipientId == data ? ( 
        <p className="text-white bg-cyan-700 rounded-md w-64 h-7 text-center">{data.RecipientId}</p>) : (<p></p>)}  */}
     {/* {params.PersonalMessageSenderId == session.data?.user.id ? (  */}
     {params.PersonalMessageSenderId == session.data?.user.id && params.PersonalMessageRecipientId == PersonalMessagesFriendId ? ( 
        <p className="text-white bg-cyan-700 rounded-md w-64 h-7 text-center">
          {PersonalMessagesFriendId}
          {PersonalMessagesText}
        </p>
        ) : (<p></p>)} 
    </>
  )
}

export default ShowPersonalMessagesWrapperComponent
