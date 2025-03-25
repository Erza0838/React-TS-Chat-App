"use client"
import React, { createContext, FC, useContext, useState } from "react"
import { useRef } from "react"
import { ClickContactContext, useClickContext } from "@/useContext/PersonalChatContext"

interface PageProps 
{
  params: 
  {
    chatid: string
    clickAction: boolean
  }
}

// const PersonalChatPageComponent: FC<PageProps> = ({ params }: PageProps) =>
const PersonalChatPageComponent = () =>
{ 
  const EscapeKeyRef = useRef<HTMLInputElement>(null)
  const ShowPersonalChat = useRef<HTMLDivElement>(null)
  // const ClickEventContext = useContext(ClickContactContext)
  const {Click, setClick} = useClickContext()
  
  function ShowElement() 
  {
    if(Click.ClickUserContact === true) 
    { 
      return <div className="flex flex-col justify-center mx-14 z-10"> 
              <p className="text-white">Obrolan pribadi display flex</p>
            </div> 
    }
    if(Click.ClickUserContact === false) 
    {
      return <div className="hidden mx-14 z-10"> 
              <p className="text-white">Obrolan pribadi false</p>
             </div>   
    }
  }

  return (
    <>
      {ShowElement()}
    </>
  )
}

export default PersonalChatPageComponent