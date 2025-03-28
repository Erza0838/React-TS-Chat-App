"use client"
import React, { FC, useState, useContext, createContext } from "react"
import PersonalChatPageComponent from "@/Components/PersonalPageClickEventComponent"
import { EventContextInterface,ClickContactContextInterface ,ClickContactContext } from "@/useContext/PersonalChatContext"


// const PersonalChatPage: FC<PageProps> = ({ params }: PageProps) =>
const PersonalChatPage = () =>
{ 
  // const [Click, setClick] = useState({ClickUserContact: false})
  return (
    <>
      <h3 className="text-white">Halaman obrolan</h3>
    </>
    // <ClickContactContext.Provider value={ContextValue}>
    // <ClickContactContext.Provider value={{Click, setClick}}>
    /* <PersonalChatPageComponent params={{ chatid: }}/> */
    //   <PersonalChatPageComponent/>
    // </ClickContactContext.Provider>
  )
}

export default PersonalChatPage