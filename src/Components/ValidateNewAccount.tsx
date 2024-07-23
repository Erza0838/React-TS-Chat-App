"use client"
import React,{ useState } from "react"
import { ValidateRegisterData } from "@/lib/validations/UserInformationValidation"
import "../app/globals.css"

const ValidateAccount = () =>
{   
    const [LoginEmail,LoginEmailValue] = useState<string>("")
    const [LoginPassword,LoginPasswordValue] = useState<string>("")

    return (
        <>
        <div className="flex justify-center translate-y-12">    
            <h1 className="text-white">Login Page</h1>
        </div>
        <div className="flex justify-center mt-28">
            <div className="flex justify-center bg-cyan-900 w-96 h-80 rounded">
                <form action="" className="flex flex-col gap-12 mt-10">
                    <input type="email" className="outline-none pl-2" placeholder="Email" name="EmailVerification" autoComplete="off" value={LoginEmail} onChange={e => LoginEmailValue(e.target.value)} required/>
                    <input type="password" className="outline-none pl-2" placeholder="Password" name="EmailVerification" autoComplete="off" value={LoginPassword} onChange={e => LoginPasswordValue(e.target.value)} required/>
                    <button type="submit" className="text-cyan-900 inline-block bg-white rounded">
                        Login
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}

export default ValidateAccount