"use client"
import React, { useRef, useState, useContext, useEffect } from "react"
import { ContactListProops } from "@/app/Interface/PersonalChatPageInterface"
import { useClickContext } from "@/useContext/PersonalChatContext"

const ShowPersonalContactPageComponent: React.FC<ContactListProops> = ({ contacts }) =>
{   
    // const ShowPersonalChat = useRef<HTMLDivElement>(null)
    const context = useClickContext()
    const { Click, setClick } = context
    // useEffect(() => 
    // {
    //     console.log(Click)
    // }, [Click])

    if(!context) 
    {
        // throw new Error("ClickContactContext must be used within a ClickContactContext.Provider");
        console.log("ClickContactContext must be used within a ClickContactContext.Provider");
        return null
    }

    // Function to update state
    const ClickContact = () => 
    {      
        setClick((prev) => ({ ...prev, ClickUserContact: true }))
        console.log(Click.ClickUserContact)
    }

    return (
        <ul className="flex flex-col gap-2">
            {contacts.map((info) => 
            (
                <li key={info.ContactId} className="text-white cursor-pointer">
                    {info.SavedContactName ? (
                        <p className="underline underline-offset-4"
                           onClick={() => ClickContact}>
                           {info.SavedContactName}
                        </p>
                    ) : (
                        <p className="underline underline-offset-4">{info.ContactId}</p>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default ShowPersonalContactPageComponent