"use client"
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ProfileIconComponent() 
{
  const [myLocation,setMyLocation] = useState<Location | null>(null)
  useEffect(() => 
  {
    setMyLocation(window.location)      
  },[])

  function ProfileIcon()
  {
    if(myLocation?.pathname === "/profilepage") 
    {
        return <Link href={"/profilepage"}>
            <div className="w-8 h-8 bg-cyan-950 cursor-pointer flex justify-center items-center rounded-full absolute right-4">
                <FontAwesomeIcon 
                    icon={faUserCircle} 
                    style={{color: "#ffffff"}}
                    className="w-5 bg-cyan-950 cursor-pointer"/>
            </div>
        </Link>
    }
    if(myLocation?.pathname !== "/profilepage") 
    {
        return <Link href={"/profilepage"}>
        <FontAwesomeIcon 
            icon={faUserCircle} 
            style={{color: "#ffffff"}}
            className="w-5 cursor-pointer"/>
        </Link>
    }
  }

  return (
   <>
        {ProfileIcon()}
   </>
  )
}
