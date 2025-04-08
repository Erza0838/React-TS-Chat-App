"use client"
import { faClone, faMessage, faSquarePlus, faUserCircle, faGear,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useClickContext } from '@/useContext/PersonalChatContext'
import { ContactInfo } from './privatechat/[ContactId]/page'
import { ContactListProops } from './Interface/PersonalChatPageInterface'

export interface PageProps 
{
    params: 
    {
        ContactId: string
        SavedContactName?: string
    }
}

// export const SidebarElement = ({ params } : PageProps) =>
// export const SidebarElement: React.FC<ContactListProops> = ({ contacts } ) =>
export const SidebarElement = () =>
{ 
  useEffect(() =>
  {
    setMyLocation(window.location)  
  },[])

  // const context = useClickContext()
  // const { Click, setClick } = context
  const [selectedContact, setSelectedContact] = useState<{
    SelectedContactId: string
    SelectedSavedContactName? : string
  } | null>(null)
  const [myLocation,setMyLocation] = useState<Location | null>(null)
  
  // const ClickPersonalChatIcon = (SelectedPersonalContactId: string, SelectedPersonalContactName: string) => 
  const ClickPersonalChatIcon = () => 
  {
    console.log("Berhasil")
    // setClick(() => ({ ClickUserContact: true }))
    // setSelectedContact({SelectedContactId: SelectedPersonalContactId, SelectedSavedContactName: SelectedPersonalContactName})    
  }

  function ChatIcon() 
  {
    // if(myLocation?.pathname === "/homepage")
    if(myLocation?.pathname === "/contact")
    {
        {/* return <Link href={"/homepage"}> */}
        return <Link href={"/contact"}>
                  <div className="w-8 h-8 bg-cyan-950 cursor-pointer flex justify-center items-center rounded-full absolute right-4 top-2">
                    <FontAwesomeIcon
                      icon={faMessage}
                      style={{color: "#ffffff"}}
                      className="w-5 bg-cyan-950 cursor-pointer"/>
                  </div>
                </Link>
    }
    // if(myLocation?.pathname === `/privatechat/${params.ContactId}`)
    if(myLocation?.pathname === `/privatechat/`)
    {
        {/* return <Link href={"/homepage"}> */}
        return <Link href={"/contact"}>
                <div className="w-8 h-8 bg-cyan-950 cursor-pointer flex justify-center items-center rounded-full absolute right-4 top-2">
                  <FontAwesomeIcon
                    icon={faMessage}
                    style={{color: "#ffffff"}}
                    className="w-5 bg-cyan-950 cursor-pointer"
                    onClick={ClickPersonalChatIcon}/>
                </div>
              </Link>
    }
    // if(myLocation?.pathname !== "/homepage")
    if(myLocation?.pathname !== "/contact")
    {
        // return <Link href={"/homepage"}>
        return <Link href={"/contact"}>
                <FontAwesomeIcon
                  icon={faMessage}
                  style={{color: "#ffffff"}}
                  className="w-5 cursor-pointer"
                  onClick={ClickPersonalChatIcon}/>
              </Link>
    }
  }

  function ProfileIcon()
  {
    // if(myLocation?.pathname === "/profilepage") 
    if(myLocation?.pathname === "/profile") 
    {
        // return <Link href={"/profilepage"}>
        return <Link href={"/profile"}>
            <div className="w-8 h-8 bg-cyan-950 cursor-pointer flex justify-center items-center rounded-full absolute right-4 top-32">
              <FontAwesomeIcon 
                  icon={faUserCircle} 
                  style={{color: "#ffffff"}}/>
            </div>
        </Link>
    }
    // if(myLocation?.pathname !== "/profilepage") 
    if(myLocation?.pathname !== "/profile") 
    {
        // return <Link href={"/profilepage"}>
        return <Link href={"/profile"}>
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
        className="w-5 cursor-pointer translate-y-1"/>
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
    <div className="inline-block bg-cyan-800 h-lvh z-10 drop-shadow-2xl">
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