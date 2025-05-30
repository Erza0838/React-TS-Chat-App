"use client"
import React, { useState } from "react"
import ShowPersonalContactPageComponent from "../ContactListComponent"
import { ClickContactContext } from "@/useContext/PersonalChatContext"
import { EventContextInterface } from "@/useContext/PersonalChatContext"
import { ContactListProops } from "@/app/Interface/PersonalChatPageInterface"
import PersonalChatPageComponent from "../PersonalPageClickEventComponent"

// interface PersonalContactWrapperProps extends ContactListProops 
// {
//     onContactClick: (ContactId: string, SavedContactName?: string) => void
// }

const PersonalContactWrapper: React.FC<ContactListProops> = ({contacts}) => 
{
    const [Click, setClick] = useState<EventContextInterface>({ClickUserContact: false})
    return (
        <ClickContactContext.Provider value={{ Click, setClick}}>
            <ShowPersonalContactPageComponent contacts={contacts}/>
        </ClickContactContext.Provider>
    )
}

export default PersonalContactWrapper