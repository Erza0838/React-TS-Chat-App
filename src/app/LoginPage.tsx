"use-client"
import { LoginDataValidationSchema } from '@/lib/validations/UserInformationValidation'
import VerifiedNewAccount from '@/app/ServerActionDirectory/ValidateLoginData'
import React from 'react'
import toast from 'react-hot-toast'

export default function LoginPage() 
{    
    // async function ClientActionLoginValidation(formData: FormData)
    const ClientActionLoginValidation = async (formData: FormData) =>
    {   
        const LoginDataClientSide = 
        {
            ValidateEmailFill: formData.get("EmailVerification") as string
        }
        const LoginValidationResult = LoginDataValidationSchema.safeParse(LoginDataClientSide)
        if(LoginValidationResult.error)
        {
            let LoginErrorMessage = ""
            LoginValidationResult.error.issues.forEach((issue) => 
            {
                LoginErrorMessage = LoginErrorMessage + issue.path[0] + ":" + issue.message + "."
            })
            toast.error(LoginErrorMessage)
            return
        }

        const result = await VerifiedNewAccount(formData)
        if(result?.error)
        {
            toast.error(result.error) 
        }
        if(result?.succes)
        {
            toast.success(result.succes)
        }
    }
  return (
    <>
    <div className="flex justify-center translate-y-12">    
        <h1 className="text-white">Login Page</h1>
    </div>
    <div className="flex justify-center mt-28">
        <div className="flex justify-center bg-cyan-900 w-80 h-60 rounded">
            <form action={ClientActionLoginValidation} className="flex flex-col gap-14 mt-10">
                <input type="email" className="outline-none pl-2" placeholder="Email" name="EmailVerification" autoComplete="off" required/>
                <button type="submit" className="text-cyan-900 inline-block bg-white rounded">
                    Login
                </button>
            </form>
        </div>
    </div>
    </>
  )
}