"use client"
import "../app/globals.css"
import React,{ useState } from "react"
// import { VerifiedNewAccount } from "@/app/ServerActionDirectory/ValidateLoginData"
import VerifiedNewAccount from "@/app/ServerActionDirectory/ValidateLoginData"
import { LoginDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import toast from "react-hot-toast"

const ValidateAccount = () =>
{    
    // eksperimen Client side validation
    // const LoginPageClientActionValidation = async (LoginFormData: FormData) => 
    // {   
    //     const LoginDataClientSide = 
    //     {
    //         ValidateEmailFill: LoginFormData.get("EmailVerification") as string,
    //         ValidatePasswordFill: LoginFormData.get("PasswordVerification") as string
    //     }
    //     const LoginValidationResult = LoginDataValidationSchema.safeParse(LoginDataClientSide)
    //     if(!LoginValidationResult.success)
    //     {
    //         let LoginErrorMessage = ""
    //         LoginValidationResult.error.issues.forEach((issue) => 
    //         {
    //             LoginErrorMessage = LoginErrorMessage + issue.path[0] + ":" + issue.message + "."
    //         })
    //         toast.error(LoginErrorMessage)
    //         return
    //     }
    //     const response = await VerifiedNewAccount(LoginValidationResult.data)
    // }

    return (
        <>
        <div className="flex justify-center translate-y-12">    
            <h1 className="text-white">Login Page</h1>
        </div>
        <div className="flex justify-center mt-28">
            <div className="flex justify-center bg-cyan-900 w-96 h-80 rounded">
                {/* <form action={LoginPageClientActionValidation} className="flex flex-col gap-12 mt-10"> */}
                <form action={VerifiedNewAccount} className="flex flex-col gap-12 mt-10">
                    <input type="email" className="outline-none pl-2" placeholder="Email" name="EmailVerification" autoComplete="off" required/>
                    <input type="password" className="outline-none pl-2" placeholder="Password" name="PasswordVerification" autoComplete="off" required/>
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