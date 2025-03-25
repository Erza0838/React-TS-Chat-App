"use client"
import React, { useState } from "react"
import ShowPersonalContactPageComponent from "../ContactListComponent"
import { ClickContactContext, ClickContactContextInterface } from "@/useContext/PersonalChatContext"
import { EventContextInterface } from "@/useContext/PersonalChatContext"
import { ContactListProops } from "@/app/Interface/PersonalChatPageInterface"

const PersonalContactWrapper: React.FC<ContactListProops> = ({contacts}) => 
{
    const [Click, setClick] = useState({ClickUserContact: false})

    // const [ClickState, setClickState] = useState<EventContextInterface>(
    // {
    //    ClickUserContact: false
    // })

    // const ContextValue: ClickContactContextInterface = { Click,setClick }
    return (
        // <ClickContactContext.Provider value={ContextValue}>
        <ClickContactContext.Provider value={{ Click, setClick}}>
            <ShowPersonalContactPageComponent contacts={contacts}>
            </ShowPersonalContactPageComponent>
        </ClickContactContext.Provider>
    )
}

export default PersonalContactWrapper