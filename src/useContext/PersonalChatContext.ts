// "use client"

import { createContext, ReactNode, useContext, useState } from "react"

export interface EventContextInterface 
{
    ClickUserContact: boolean,
}

export interface ClickContactContextInterface 
{
    Click: EventContextInterface,
    setClick: React.Dispatch<React.SetStateAction<EventContextInterface>>
}

export const ClickContactContext = createContext<ClickContactContextInterface | undefined>(undefined)

export function useClickContext()
{
    const context = useContext(ClickContactContext)
    if(context === undefined) 
    {
        throw new Error("Harus menggunakan useContext")
    }
    return context
}

// export const ChatProvider = ({ children }: { children: ReactNode }) => 
// {
//     const [clickState, setClickState] = useState<EventContextInterface>(
//     {
//         ClickUserContact: false
//     })
// }