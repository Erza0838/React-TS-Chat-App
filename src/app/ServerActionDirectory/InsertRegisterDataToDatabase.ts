"use server"
import { prisma } from "../Database"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"
import Link from "next/link"
import ValidateAccount from "@/Components/ValidateNewAccount"
import { cookies } from "next/headers"

// Eksperimen JWT
import jwt from "jsonwebtoken"
import { encrypt } from "@/lib/UpdateSession"
import { decrypt } from "@/lib/UpdateSession"

export default async function InsertNewAccountInformation(data: FormData)
{ 
  const SecretToken = process.env.JWT_SECRET_KEY
  try 
  { 
    const rawFormData = 
    { 
      GenderData: data.get("Gender") as string,
      EmailData: data.get("Email") as string,
      UsernameData: data.get("Username") as string,
      PasswordData: await bcrypt.hash(data.get("Password") as string, 10), 
    }

    const JwtPayload = 
    {
      token: jwt.sign(
      {
        GenderPayload: rawFormData.GenderData,
        EmailPayload: rawFormData.EmailData,
        UsernamePayload: rawFormData.UsernameData,
        PasswordPayload: rawFormData.PasswordData

      },SecretToken as string)
    }

    if(JwtPayload.token)
    { 
      const expires = new Date(Date.now() + 10 * 1000)
      const session = await encrypt({rawFormData})
      let SaveDataToCookie = cookies().set("session",session,{expires,httpOnly:true})
      console.log("===Data cookie===")
      console.log(SaveDataToCookie)
      // const EncodeRegisterData = jwt.decode(JwtPayload.token) as {[key: string]: string}
      // console.log(EncodeRegisterData)
      // console.log(`Data token register : ${JwtPayload.token}`)

      // console.log("=======")
      // console.log(decrypt(JwtPayload.token)) 
      // cookies().set("session", JwtPayload, {})
      // const SaveSession = cookies().get("session")?.value
      // if(!SaveSession)
      // {
      //   return null
      // }
    }

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
  } 
  catch (error) 
  {
    console.log(error)  
  }
}

// 