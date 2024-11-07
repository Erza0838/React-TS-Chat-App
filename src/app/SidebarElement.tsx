"use client"
import { faClone, faMessage, faSquarePlus, faUserCircle, faGear,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserModel } from "@prisma/client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const SidebarElement = () =>
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
          <div className="w-8 h-8 bg-cyan-950 cursor-pointer flex justify-center items-center rounded-full absolute right-4">
            <FontAwesomeIcon
              icon={faMessage}
              style={{color: "#ffffff"}}
              className="w-5 bg-cyan-950 cursor-pointer"/>
          </div>
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

  function ProfileIcon()
  {
    if(myLocation?.pathname === "/profilepage") 
    {
        return <Link href={"/profilepage"}>
            <div className="w-8 h-8 bg-cyan-950 cursor-pointer flex justify-center items-center rounded-full absolute right-4 top-32">
              <FontAwesomeIcon 
                  icon={faUserCircle} 
                  style={{color: "#ffffff"}}/>
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

  function GrupIcon() 
  {
    if(myLocation?.pathname === "/gruppage") 
    {
      return <Link href={"/gruppage"}>
          <div className="w-8 h-8 bg-cyan-950 cursor-pointer flex justify-center items-center rounded-full absolute right-4 top-14">  
            <FontAwesomeIcon 
                icon={faClone} 
                style={{color: "#ffffff"}}
                className="w-5 cursor-pointer"/>
          </div>
        </Link>
    }
    if(myLocation?.pathname !== "/gruppage") 
    {
      return <Link href={"/gruppage"}>
        <FontAwesomeIcon
        icon={faClone}
        style={{color: "#ffffff"}}
        className="w-5 cursor-pointer translate-y-0"/>
      </Link>
    }
  }

  function SettingIcon() 
  {
      if(myLocation?.pathname === "/settingpages") 
      {
        return <Link href={"/settingpages"}>
          <div className="w-8 h-8 bg-cyan-950 cursor-pointer flex justify-center items-center rounded-full absolute right-4 top-48">
            <FontAwesomeIcon
              icon={faGear}
              style={{color: "#ffffff"}}
              className="w-5 cursor-pointer"/>
          </div>  
        </Link>
      }
      if(myLocation?.pathname !== "/settingpages") 
      {
        return <Link href={"/settingpages"}>
          <FontAwesomeIcon
            icon={faGear}
            style={{color: "#ffffff"}}
            className="w-5 cursor-pointer"/>
        </Link>
      }
  }

  function AddIcon() 
  {
    if(myLocation?.pathname === "/add/addcontact") 
      {
        return <Link href={"/add/addcontact"}>
          <div className="w-8 h-8 bg-cyan-950 cursor-pointer flex justify-center items-center rounded-full absolute right-4 top-64">
            <FontAwesomeIcon
              icon={faSquarePlus}
              style={{color: "#ffffff"}}
              className="w-5 cursor-pointer"/>
          </div>  
        </Link>
      }
      if(myLocation?.pathname !== "/add/addcontact") 
      {
        return <Link href={"/add/addcontact"}>
          <FontAwesomeIcon
            icon={faSquarePlus}
            style={{color: "#ffffff"}}
            className="w-5 cursor-pointer"/>
        </Link>
      }
  }

  return (
    <div className="inline-block bg-cyan-700 h-lvh z-10 drop-shadow-2xl">
        <div className="flex flex-col gap-10 mx-6 my-3">           
            {/* Icon obrolan */}
            {ChatIcon()}            

            {/* Icon grup */}
            {GrupIcon()}
            
            {/* Icon profile */}
            {ProfileIcon()}
            
            {/* Icon setting */}
            {SettingIcon()}

            {/* Icon tambah */}
            {AddIcon()}
        </div>
    </div>
  )
}