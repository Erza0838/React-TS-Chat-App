"use server"
import { prisma } from "../Database"
import { z } from "zod"
import bcrypt from "bcrypt"
import { use } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { useRouter } from "next/router"

const NewAccountDataValidation = z.object(
{
  GenderFill: z.string().min(2),
  EmailFill: z.string().min(2),
  UsernameFill: z.string().min(2),
  PasswordFill: z.string().min(2),
})

export default async function InsertNewAccountInformation(data: FormData)
{ 
  try 
  {
    const rawFormData = 
    {
      GenderData: data.get("Gender") as string,
      EmailData: data.get("Email") as string,
      UsernameData: data.get("Username") as string,
      PasswordData: await bcrypt.hash(data.get("Password") as string, 10), 
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
  finally
  {
    redirect("/pages")
  }
}