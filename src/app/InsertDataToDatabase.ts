"use server"
// import CreateAccount from "@/Components/CreateAccount"
import CreateAccountData from "./ClientApi/CreateAccountData"
import { prisma } from "./Database"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
// import { v4 as uuidv4 } from "uuid"

// const UnixId = uuidv4()

// const UserInformationSchema = z.object(
// {
//   GenderFill: z.string().min(2),
//   EmailFill: z.string().min(2),
//   UsernameFill: z.string().min(2),
//   PasswordFill: z.string().min(2),
// })

// export default async function InsertNewAccountInformation(prevState: any,data: FormData)
export default async function InsertNewAccountInformation(data: FormData)
{ 
  // const rawFormData = Object.fromEntries(data)
  const rawFormData = 
  {
    Gender: data.get("Gender"),
    Email: data.get("Email"),
    Username: data.get("Username"),
    Password: data.get("Password"), 
  }
  const insert = await prisma.userModel.create(
  {
    data: rawFormData,
  })

  // const UserInformation = UserInformationSchema.safeParse(Object.fromEntries(data.entries())) 
  // if(!UserInformation.success)
  // {
  //   return 
  //   {
  //     Error: UserInformation.error?.flatten().fieldErrors
  //   }
  // }
  // else 
  // {
  //   await prisma.userModel.create(
  //   {
  //     data : 
  //     {
  //       Genders: UserInformation.data.GenderFill,
  //       Email: UserInformation.data.EmailFill,
  //       Username: UserInformation.data.UsernameFill,
  //       Password: UserInformation.data.PasswordFill,
  //     }
  //   }) 
  // }
}