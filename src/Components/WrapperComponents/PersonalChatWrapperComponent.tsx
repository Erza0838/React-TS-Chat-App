"use client"
import React, { useState } from "react"
import ShowPersonalContactPageComponent from "../ContactListComponent"
import { ClickContactContext, ClickContactContextInterface } from "@/useContext/PersonalChatContext"
import { EventContextInterface } from "@/useContext/PersonalChatContext"
import { ContactListProops } from "@/app/Interface/PersonalChatPageInterface"
import PersonalChatPageComponent from "../PersonalPageClickEventComponent"
import PersonalChatPage from "@/app/chatpage/personalchat/[chatid]/page"

const PersonalContactWrapper: React.FC<ContactListProops> = ({contacts}) => 
{
    // const [Click, setClick] = useState<EventContextInterface>({ClickUserContact: false})
    const [Click, setClick] = useState<EventContextInterface>({ClickUserContact: true})
    return (
        // <ClickContactContext.Provider value={ContextValue}>
        <ClickContactContext.Provider value={{ Click, setClick}}>
            <ShowPersonalContactPageComponent contacts={contacts}/>
        </ClickContactContext.Provider>
    )
}

export default PersonalContactWrapper