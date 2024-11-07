"use client"
import React from 'react'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link"
import { useEffect,useState } from 'react'

export default function ChatIconComponent()
{   
  const [myLocation,setMyLocation] = useState<Location | null>(null)
  useEffect(() =>
  {
    setMyLocation(window.location)  
  },[])

  function ChatIcon() 
  {
    if(myLocation?.pathname === "/homepage")
    {
        return <Link href={"/homepage"}>
            <FontAwesomeIcon
            icon={faMessage}
            style={{color: "#ffffff"}}
            className="w-5 bg-cyan-950 cursor-pointer"/>
        </Link>
    }
    if(myLocation?.pathname !== "/homepage")
    {
        return <Link href={"/homepage"}>
            <FontAwesomeIcon
            icon={faMessage}
            style={{color: "#ffffff"}}
            className="w-5 cursor-pointer"/>
        </Link>
    }
  }

  return (
    <>
        {ChatIcon()}
    </>
  )
}
