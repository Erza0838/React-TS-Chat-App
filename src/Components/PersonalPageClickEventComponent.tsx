"use client"
import React, { createContext, FC, useContext, useState } from "react"
import { useRef } from "react"
import { ClickContactContext, UseClickContext } from "@/useContext/PersonalChatContext"

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
  const {Click} = UseClickContext()
  
  function ShowElement() 
  {
    if(Click.ClickUserContact === true) 
    { 
      console.log(Click.ClickUserContact)
      return <div className="flex flex-col justify-center mx-14 z-10"> 
              <p className="text-white">Obrolan pribadi display flex</p>
            </div> 
    }
    if(Click.ClickUserContact === false) 
    {
      return <div className="hidden mx-14 z-10" ref={ShowPersonalChat}> 
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