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

type PersonalMessagePropertieList = PersonalMessageProperties[]

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
    async function FetchPersonalMessages(): Promise<PersonalMessageProperties | void> 
    {
      try 
      {
        const FetchPersonalMessageResponse = await fetch("/api/chat/showpersonalmessages")
        if(!FetchPersonalMessageResponse.ok || FetchPersonalMessageResponse.status !== 200) 
        {
          throw new Error("Gagal mengambil pesan pribadi")
        }
        const FetchPersonalMessageData: PersonalMessagePropertieList = await FetchPersonalMessageResponse.json()
        console.log("API : " + JSON.stringify(FetchPersonalMessageData[0].PersonalMessageText))
        // const FetchPersonalMessageData: PersonalMessagePropertieList = await FetchPersonalMessageResponse.json()
        // FetchPersonalMessageData.map((item) =>
        // {
        //   console.log("Pesan pribadi : " + item.PersonalMessageText)
        //   console.log("ID Pengirim : " + item.RecipientId)
        // })
        // setPersonalMessagesFriendId(FetchPersonalMessageData[0].RecipientId)
        // setPersonalMessagesText(FetchPersonalMessageData[0].PersonalMessageText)
        setPersonalMessagesFriendId(FetchPersonalMessageData[3].RecipientId)
        setPersonalMessagesText(FetchPersonalMessageData[0].PersonalMessageText)
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
     {/* {params.PersonalMessageSenderId == session.data?.user.id && params.PersonalMessageRecipientId == data ? ( 
        <p className="text-white bg-cyan-700 rounded-md w-64 h-7 text-center">{data.RecipientId}</p>) : (<p></p>)}  */}
     {params.PersonalMessageSenderId == session.data?.user.id && params.PersonalMessageRecipientId == PersonalMessagesFriendId ? ( 
        <p className="text-white bg-cyan-700 rounded-md w-64 h-7 text-center">
          {PersonalMessagesText}
          {/* Halo */}
        </p>
        ) : (<p></p>)} 
    </>
  )
}

export default ShowPersonalMessagesWrapperComponent
