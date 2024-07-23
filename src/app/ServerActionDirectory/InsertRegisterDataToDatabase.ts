"use server"
import { prisma } from "../Database"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"
import Link from "next/link"
import ValidateAccount from "@/Components/ValidateNewAccount"
import { cookies } from "next/headers"
import { permanentRedirect } from "next/navigation"

// Eksperimen JWT
import jwt from "jsonwebtoken"
import { encrypt } from "@/lib/UpdateSession"
import { decrypt } from "@/lib/UpdateSession"
import VerifiedRegisterToken from "./ValidateLoginAccount"
import SecretToken from "@/lib/UpdateSession"
import { NextRequest } from "next/server"
import { Middleware } from "@/Middleware"

export default async function InsertNewAccountInformation(data: FormData)
{ 
  // const request: NextRequest 
  const rawFormData = 
  { 
    GenderData: data.get("Gender") as string,
    EmailData: data.get("Email") as string,
    UsernameData: data.get("Username") as string,
    PasswordData: await bcrypt.hash(data.get("Password") as string, 10), 
  }

    const expires = new Date(Date.now() + 10 * 1000)
    const session = await encrypt({rawFormData})
    const SaveDataToCookie = cookies().set("session",session,
    {
        expires,
        httpOnly:true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
    })
    
    console.log("=== Data Encrypt  ===")
    console.log(session)

    console.log("===  Token register ===")
    console.log(SecretToken)

    // console.log("===Data decode===")
    // console.log(decrypt(session))

    // console.log("=== Cookie ===")
    // console.log(cookies().get("session")?.value)

    const insert = await prisma.userModel.create(
    {
      data: 
      {
          Genders: rawFormData.GenderData,
          Email: rawFormData.EmailData,
          Username: rawFormData.UsernameData,
          Password: rawFormData.PasswordData, 
      }
    })
    
    if(SecretToken)
    {
      if(rawFormData != null)
      {
        // permanentRedirect("/pages")
        Middleware 
        // redirect("/pages")
      }
    }
}
