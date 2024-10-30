"use client"

import React from 'react'
import { UserModel } from '@prisma/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faMessage, faSquarePlus, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { SidebarComponents } from '@/Components/SidebarComponents'
import { getServerSession } from 'next-auth/next'
import { signOut, useSession } from 'next-auth/react'
import { SessionProviderProps } from 'next-auth/react'
import { authOptions } from '@/lib/authOptions'

const ProfilePageComponent = () =>
{ 
  // const session = await getServerSession(authOptions)
  const { data: session,status } = useSession({
    required: true,
    onUnauthenticated() 
    {
      console.log("Not authenticated")  
    },
  })
  
  // if(status === "loading") 
  // {
  //   return <h1 className="text-white">Loading...</h1>
  // }

  // if(status === "unauthenticated") 
  // {
  //   return <h1 className="text-white">Belum login</h1>
  // }

  const handleSignout = () => 
  {
    signOut()
  }

  return(
    <>
      <pre className="text-white">{JSON.stringify({session,status},null,2)}</pre>
      <h1 className="text-white">Nama : {session?.user?.name}</h1>
      <h1 className="text-white">Email : {session?.user?.email}</h1>
      <button onClick={handleSignout} className="text-black bg-white">Signout</button>
    </>
  )
}

export default ProfilePageComponent