"use client"
import "../app/globals.css"
import React,{ useState } from "react"
// import { VerifiedNewAccount } from "@/app/ServerActionDirectory/ValidateLoginData"
import { LoginDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import LoginFormComponent from "./LoginFormComponent"
import { prisma } from "@/app/Database"

export const ValidateAccount = async () =>
{    
    return (
        <>
            <LoginFormComponent></LoginFormComponent>
        </>
    )
}

export default ValidateAccount