"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import React from "react"
import ChatInputPersonalComponent from "@/Components/ChatInputPersonalComponent"

const PrivateChatPage = () => 
{   
    const router = useRouter()
    useEffect(() => 
    {
        const RedirectPageKeyPress = (event: KeyboardEvent) => 
        {
            if(event.key === "Escape") 
            {   
                router.push("/homepage")
            }
        }
        document.addEventListener("keydown", RedirectPageKeyPress)

        return () => 
        {
            document.removeEventListener("keydown", RedirectPageKeyPress)
        }

    }, [router])

    return (
        <>
            <h1 className="text-white">Obrolan pribadi</h1>
            <ChatInputPersonalComponent/>
        </>
    )
}

export default PrivateChatPage