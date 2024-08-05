"use-client"
import { LoginDataValidationSchema } from '@/lib/validations/UserInformationValidation'
import VerifiedNewAccount from '@/app/ServerActionDirectory/ValidateLoginData'
import React, { useEffect, useState }  from 'react'
import toast from 'react-hot-toast'

export default function LoginFormComponent() 
{    

    const [Email,SetEmail] = useState<string>("")
    const [Password,SetPassword] = useState<string>("")

    // Eksperimen client validation
    async function ClientActionLoginValidation(formData: FormData)
    {   
        const LoginDataClientSide = 
        {
            ValidateEmailFill: formData.get("EmailVerification") as string,
            ValidatePasswordFill: formData.get("PasswordVerification") as string
        }
        // const LoginValidationResult = LoginDataValidationSchema.safeParse(LoginDataClientSide)
        // if(LoginValidationResult.error)
        // {
        //     let LoginErrorMessage = ""
        //     LoginValidationResult.error.issues.forEach((issue) => 
        //     {
        //         LoginErrorMessage = LoginErrorMessage + issue.path[0] + ":" + issue.message + "."
        //     })
        //     toast.error(LoginErrorMessage)
        //     return
        // }

        // const result = await VerifiedNewAccount(LoginValidationResult.data)
        // if(result?.error)
        // {
        //     toast.error(result.error) 
        // }
    }
  return (
    <>
    <div className="flex justify-center translate-y-12">    
        <h1 className="text-white">Login Page</h1>
    </div>
    <div className="flex justify-center mt-28">
        <div className="flex justify-center bg-cyan-900 w-96 h-80 rounded">
            <form action={VerifiedNewAccount} className="flex flex-col gap-12 mt-10">
            {/* <form action={ClientActionLoginValidation} className="flex flex-col gap-12 mt-10"> */}
                <input type="email" className="outline-none pl-2" placeholder="Email" name="EmailVerification" autoComplete="off" value={Email} onChange={(event) => SetEmail(event.target.value)} required/>
                <input type="password" className="outline-none pl-2" placeholder="Password" name="PasswordVerification" autoComplete="off" value={Password} onChange={(event) => SetPassword(event.target.value)} required/>
                <button type="submit" className="text-cyan-900 inline-block bg-white rounded">
                    Login
                </button>
                {/* {
                    error && 
                    (
                        <p className="text-red-600">{error}</p>
                    )
                } */}
            </form>
        </div>
    </div>
    </>
  )
}
