"use client"
import React, { useRef, useState, useContext, useEffect, KeyboardEvent } from "react"
import { ContactListProops } from "@/app/Interface/PersonalChatPageInterface"
import { ClickContactContext, useClickContext } from "@/useContext/PersonalChatContext"
import PersonalChatPageComponent from "./PersonalPageClickEventComponent"
import DisplayPersonalContactComponent from "./DisplayPersonalContactComponent"

const ShowPersonalContactPageComponent: React.FC<ContactListProops> = ({ contacts }) =>
{   
    const context = useClickContext()

    const { Click, setClick } = context
    const [selectedContact, setSelectedContact] = useState<{
        SelectedContactId: string
        SelectedSavedContactName? : string
    } | null>(null)

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

    const ClickContact = (SelectedContactId: string, SelectedSavedContactName: string) => 
    {      
        setClick(() => ({ ClickUserContact: true }))
        setSelectedContact({SelectedContactId, SelectedSavedContactName})
    }
        
    if(!context) 
    {
        throw new Error("ClickContactContext must be used within a ClickContactContext.Provider")
    }

    return (
        <>
            <ul className="flex flex-col gap-5">
                {contacts.map((info) => 
                (
                    <li key={info.ContactId} className="text-white cursor-pointer">
                        {info.SavedContactName ? (
                            <p className="underline underline-offset-4 font-bold"
                            onClick={() => ClickContact(info.ContactId, info.SavedContactName)}>
                            {info.SavedContactName}
                            </p>
                        ) : (
                            <p className="underline underline-offset-4 font-bold" 
                            onClick={() => ClickContact(info.ContactId, info.SavedContactName)}>
                            {info.ContactId}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
            {selectedContact && (
                <ClickContactContext.Provider value={{ Click, setClick}}>
                    <DisplayPersonalContactComponent params={{
                        ContactId: selectedContact.SelectedContactId, 
                        SavedContactName: selectedContact.SelectedSavedContactName!}}/>
                </ClickContactContext.Provider>
            )}
            {/* {selectedContact && (
                    <ClickContactContext.Provider value={{Click, setClick}}>
                        <PersonalChatPageComponent params={{
                            ContactId: selectedContact.SelectedContactId, 
                            SavedContactName: selectedContact.SelectedSavedContactName || ""}}/>
                    </ClickContactContext.Provider>  
            )} */}
        </>
    )
}

export default ShowPersonalContactPageComponent