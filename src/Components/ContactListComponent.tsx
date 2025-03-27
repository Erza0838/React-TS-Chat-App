"use client"
import React, { useRef, useState, useContext, useEffect, KeyboardEvent } from "react"
import { ContactListProops } from "@/app/Interface/PersonalChatPageInterface"
import { ClickContactContext, useClickContext } from "@/useContext/PersonalChatContext"
import PersonalChatPageComponent from "./PersonalPageClickEventComponent"
import { useRouter } from "next/navigation"

const ShowPersonalContactPageComponent: React.FC<ContactListProops> = ({ contacts }) =>
{   
    const context = useClickContext()
    const router = useRouter()
    const { Click, setClick } = context

    useEffect(() => 
    {
        const HidePersonalChatEscapeKey = (event: globalThis.KeyboardEvent) => 
        {      
            if(event.key === "Escape") 
            {
                setClick(() => ({ ClickUserContact: false }))  
            }   
        }

        document.addEventListener("keydown", HidePersonalChatEscapeKey)

        return () => 
        {
            document.removeEventListener("keydown", HidePersonalChatEscapeKey)
        }
            
    }, [setClick])

    // Function to update state
    const ClickContact = () => 
    {      
        setClick(() => ({ ClickUserContact: true }))
    }
        
    if(!context) 
    {
        throw new Error("ClickContactContext must be used within a ClickContactContext.Provider")
    }

    function RenderPersonalChatPage() 
    {
        return <ClickContactContext.Provider value={{Click, setClick}}>
                {/* <PersonalChatPageComponent params={{ chatid: contacts[0]?.ContactId, contactname: contacts[0]?.SavedContactName || "" }}/> */}
                <PersonalChatPageComponent params={{ ContactId: contacts[0]?.ContactId, SavedContactName: contacts[0]?.SavedContactName || "" }}/>
               </ClickContactContext.Provider>  
    }

    return (
        <ul className="flex flex-col gap-5">
            {contacts.map((info) => 
            (
                <li key={info.ContactId} className="text-white cursor-pointer">
                    {info.SavedContactName ? (
                        <p className="underline underline-offset-4 font-bold"
                            onClick={ClickContact}>
                           {info.SavedContactName}
                        </p>
                    ) : (
                        <p className="underline underline-offset-4 font-bold">{info.ContactId}</p>
                    )}
                </li>
            ))}
            {RenderPersonalChatPage()}
        </ul>
    )
}

export default ShowPersonalContactPageComponent