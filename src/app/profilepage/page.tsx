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
  try 
  {
    console.log("Auth options:",JSON.stringify(authOptions))  
    const session = await getServerSession(authOptions)
    console.log("Data dari session : " + JSON.stringify(session))

    if(!session)
    { 
      console.log("Data session kosong")
    }
    else 
    {
      return(
        <>
          <h1 className="text-white">Nama : {session?.user?.name}</h1>
        </>
      )
    }
  } 
  catch (error) 
  {
    console.log("Error session : " + error)
    return <h1 className="text-white">Profile error</h1>
  }
}

export default ProfilePageComponent

