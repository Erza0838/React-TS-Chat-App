"use client"

import React, { useRef } from "react"
import PersonalChatPage from "@/app/chatpage/personalchat/[chatid]/page"
import { useRouter,redirect } from "next/navigation"

interface ContactInterface 
{   
    // ContactInformation: string
    ContactId: string
    SavedContactName: string
}

interface ContactListProops 
{
    contacts: ContactInterface[]
}

const ShowPersonalContactPageComponent: React.FC<ContactListProops> = ({ contacts }) =>
{   
    const EscapeKeyRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const BackToContactListPage = (event: React.KeyboardEvent<HTMLInputElement>) => 
    {
        switch(event.key) 
        {
            case "Escape" : 
                            if(EscapeKeyRef.current) 
                            {   
                                console.log("Escape key pressed")
                                router.push("/homepage")
                            }
                break
        }
    }

    const ClickContact = (contactId: string) =>
    {   
        // console.log("Halaman kontak pribadi")
        // return <PersonalChatPage params={{ chatid: contactId }} />
        router.push(`/chatpage/personalchat/${contactId}`)
    }
    return (
        <ul className="flex flex-col gap-2">
            {contacts.map((info) => (
                <li key={info.ContactId} className="text-white cursor-pointer">
                    {info.SavedContactName ? (
                        <p className="underline underline-offset-4"
                           onClick={() => ClickContact(info.ContactId)}
                           onKeyDown={BackToContactListPage}>
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