import React from 'react'
import { UserModel } from '@prisma/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faMessage, faSquarePlus, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { SidebarComponents } from '@/Components/SidebarComponents'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/authOptions'

const ProfilePageComponent = async () =>
{ 
  const session = await getServerSession(authOptions)
  console.log("Data dari session : " + session)
  return(
    <>
      <h1 className="text-white">Nama : {session?.user?.name}</h1>
      <h1 className="text-white">Email : {session?.user?.email}</h1>
    </>
  )
}

export default ProfilePageComponent