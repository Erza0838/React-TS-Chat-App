"use client"

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRef } from 'react'

export default function InputProfileHandler() 
{
//   const session = useSession()
//   return (
//     <>  
//         <input type="text" 
//                name=""
//                className="focus:outline-none rounded-md px-1 py-1 min-w-24 text-white bg-cyan-950"
//                value={session.data?.user?.name ?? ""}/>
//     </>
//   )
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => 
    {
        inputRef.current?.focus()
    },[])
    return inputRef
}
