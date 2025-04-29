"use client"

import React, { useEffect } from 'react'
import useSWR from "swr"

interface PageProps 
{
    params:
    {
        PersonalMessageRecipientId: string
        // ContactId: string
    }
}

const ShowPersonalMessagesWrapperComponent = ({params} : PageProps) =>
{
  console.log("ID Teman : " + params.PersonalMessageRecipientId)
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, isLoading, isValidating, error } = useSWR<string>(`/api/chat/showpersonalmessages/${params.PersonalMessageRecipientId}`, 
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
     {params.PersonalMessageRecipientId && params.PersonalMessageRecipientId.length > 0 ? ( 
        <p className="text-slate-900 bg-white rounded-md w-64 h-7 text-center">
            {params.PersonalMessageRecipientId}
        </p>) : (<p className="text-slate-900 bg-white rounded-md w-40 h-7 text-center">Pesan kosong</p>)} 
     {/* {data && data.length > 0 ? ( 
        <p className="text-slate-900 bg-white rounded-md w-64 h-7 text-center">
            {data}
        </p>) : (<p className="text-slate-900 bg-white rounded-md w-40 h-7 text-center">Pesan kosong</p>)}  */}
    </>
  )
}

export default ShowPersonalMessagesWrapperComponent
