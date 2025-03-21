"use client"

import React from "react"
import PersonalChatPage from "@/app/chatpage/personalchat/[chatid]/page"

interface ContactInterface 
{   
    // ContactInformation: string
    ContactId: string
    SavedContactName: string
}

interface ContactListProops 
{
    // contacts: ContactInfo[]
    contacts: ContactInterface[]
}

const ShowPersonalContactPageComponent: React.FC<ContactListProops> = ({ contacts }) =>
{
    const ClickContact = (contactId: string) =>
    {   
        console.log("Halaman kontak pribadi")
        return <PersonalChatPage params={{ chatid: contactId }} />
    }
    return (
        <ul className="flex flex-col gap-2">
            {contacts.map((info) => (
                <li key={info.ContactId} className="text-white cursor-pointer">
                    {info.SavedContactName ? (
                        <p className="underline underline-offset-4" onClick={() => ClickContact(info.ContactId)}>{info.SavedContactName}</p>
                    ) : (
                        <p className="underline underline-offset-4" onClick={() => ClickContact(info.ContactId)}>{info.ContactId}</p>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default ShowPersonalContactPageComponent