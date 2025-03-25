"use client"
import React, { FC, useState, useContext, createContext } from "react"
import PersonalChatPageComponent from "@/Components/PersonalPageClickEventComponent"
import { EventContextInterface,ClickContactContextInterface ,ClickContactContext } from "@/useContext/PersonalChatContext"

// const PersonalChatPage: FC<PageProps> = ({ params }: PageProps) =>
const PersonalChatPage = () =>
{ 
  const [Click, setClick] = useState<EventContextInterface>
  ({
      ClickUserContact: false
  })

  const ContextValue: ClickContactContextInterface = { Click,setClick }

  return (
    <ClickContactContext.Provider value={ContextValue}>
      {/* <PersonalChatPageComponent params={{ chatid: "123", clickAction: clickContact}}/> */}
      <PersonalChatPageComponent/>
    </ClickContactContext.Provider>
  )
}

export default PersonalChatPage