"use client"

import React, { useEffect } from 'react'
import useSWR from "swr"
import { useSession } from 'next-auth/react'

interface PersonalMessageProperties 
{
    RecipientId: string
}

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
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const session = useSession()
//   const { data, isLoading, isValidating, error } = useSWR<string>(`/api/chat/showpersonalmessages/${params.PersonalMessageRecipientId}`, 
  const { data, isLoading, isValidating, error } = useSWR<string>(`/api/chat/showpersonalmessages`, 
        fetcher,
    {
        revalidateOnFocus: false, 
        revalidateOnReconnect: false
    })
//    useEffect(() => 
//   {
//     if(data !== null) 
//     { 
//       setPersonalMessage("")
//     }
//   },[data])


  return (
    <>
     {params.PersonalMessageSenderId == session.data?.user.id? ( 
        <p className="text-white bg-cyan-700 rounded-md w-64 h-7 text-center">{data}</p>) : (<p></p>)} 
     {/* {data && data.length > 0 ? ( 
        <p className="text-slate-900 bg-white rounded-md w-64 h-7 text-center">
            {data}
        </p>) : (<p className="text-slate-900 bg-white rounded-md w-40 h-7 text-center">Pesan kosong</p>)}  */}
    </>
  )
}

export default ShowPersonalMessagesWrapperComponent
