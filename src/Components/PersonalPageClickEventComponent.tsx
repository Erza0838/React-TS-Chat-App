"use client"
import React, { createContext, FC, useContext, useState } from "react"
import { useRef } from "react"
import { ClickContactContext, useClickContext } from "@/useContext/PersonalChatContext"

interface PageProps 
{
  params: 
  {
    // chatid: string
    ContactId: string
    SavedContactName: string
    // contactname: string
  }
}

// const PersonalChatPageComponent = () =>
const PersonalChatPageComponent: FC<PageProps> = ({ params }: PageProps) =>
{ 
  const {Click, setClick} = useClickContext()
  
  function ShowElement() 
  {
    if(Click.ClickUserContact === true) 
    { 
      return <div className="flex flex-col justify-center mx-14 z-10"> 
              {/* <p className="text-white">{params.chatid}</p> */}
              <p className="text-white">{params.ContactId}</p>
            </div> 
    }
    if(Click.ClickUserContact === false) 
    {
      return   
    }
  }

  return (
    <>
      {ShowElement()}
    </>
  )
}

export default PersonalChatPageComponent