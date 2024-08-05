"use client"
import "../app/globals.css"
import React,{ useState } from "react"
// import { VerifiedNewAccount } from "@/app/ServerActionDirectory/ValidateLoginData"
import { LoginDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import LoginFormComponent from "./LoginFormComponent"
import { prisma } from "@/app/Database"

export const ValidateAccount = async () =>
{    
    // Eksperimen ke 1 Client side validation
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

    // Eksperimen ke 2 Client side validation
    
    // const FindLoginDataInDatabase = await prisma.userModel.findMany()   
    return (
        <>
            <LoginFormComponent></LoginFormComponent>
        </>
    )
}

export default ValidateAccount