import { createContext, useContext } from "react"

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

export function UseClickContext()
{
    const context = useContext(ClickContactContext)
    if(context === undefined) 
    {
        throw new Error("Harus menggunakan useContext")
    }
    return context
}