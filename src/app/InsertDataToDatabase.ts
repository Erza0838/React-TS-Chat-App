"use server"
import { prisma } from "./Database"
import { z } from "zod"
import bcrypt from "bcrypt"
import { use } from "react"
// import { v4 as uuidv4 } from "uuid"

// const UnixId = uuidv4()

// const UserInformationSchema = z.object(
// {
//   GenderFill: z.string().min(2),
//   EmailFill: z.string().min(2),
//   UsernameFill: z.string().min(2),
//   PasswordFill: z.string().min(2),
// })

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
}