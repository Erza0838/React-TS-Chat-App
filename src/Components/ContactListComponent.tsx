"use client"
import React, { useRef, useState, useContext } from "react"
import PersonalChatPage from "@/app/chatpage/personalchat/[chatid]/page"
import { useRouter,redirect } from "next/navigation"
import { ClickContactContext } from "@/useContext/PersonalChatContext"
import { EventContextInterface } from "@/useContext/PersonalChatContext"
import { ContactListProops } from "@/app/Interface/PersonalChatPageInterface"
import { UseClickContext } from "@/useContext/PersonalChatContext"

const ShowPersonalContactPageComponent: React.FC<ContactListProops> = ({ contacts }) =>
{   
    const context = UseClickContext()
    if(!context) 
    {
        throw new Error("ClickContactContext must be used within a ClickContactContext.Provider");
    }
    const { Click, setClick } = context
    const ClickContact = (contactId: string) =>
    {   
        setClick({ ClickUserContact: true })
    }
    return (
        <ul className="flex flex-col gap-2">
            {contacts.map((info) => (
                <li key={info.ContactId} className="text-white cursor-pointer">
                    {info.SavedContactName ? (
                        <p className="underline underline-offset-4"
                           onClick={() => ClickContact(info.ContactId)}>
                            {info.SavedContactName}
                        </p>
                    ) : (
                        <p className="underline underline-offset-4" onClick={() => ClickContact(info.ContactId)}>{info.ContactId}</p>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default ShowPersonalContactPageComponent