import { useRouter } from "next/router"
import { useEffect } from "react"

export default function PressEscapekey() 
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
}