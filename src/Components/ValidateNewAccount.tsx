"use client"
import React,{ useState } from "react"

const ValidateAccount = () =>
{   
    const [LoginEmail,LoginEmailValue] = useState<string>("")
    const [LoginPassword,LoginPasswordValue] = useState<string>("")

    return (
        <>
        <div className="flex justify-center translate-y-12">    
            <h1 className="text-white">Login Page</h1>
        </div>
        </>
    )
}

export default ValidateAccount