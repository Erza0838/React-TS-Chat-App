"use server"
import { prisma } from "../Database"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { encrypt } from "@/lib/UpdateSession"
import SecretToken from "@/lib/UpdateSession"
import { redirect } from "next/navigation"
import { AccountDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import { error } from "console"

// export async function InsertNewAccountInformation(data: FormData)
export const InsertNewAccountInformation = async (RegisterDataClientSide: unknown) =>
{ 
  // const rawFormData = 
  // { 
  //   GenderData: data.get("Gender") as string,
  //   EmailData: data.get("Email") as string,
  //   UsernameData: data.get("Username") as string,
  //   PasswordData: await bcrypt.hash(data.get("Password") as string, 10), 
  // }
  const ServerValidationResult = AccountDataValidationSchema.safeParse(RegisterDataClientSide)
  
  // let session = await encrypt({FormData})
  let session = await encrypt(ServerValidationResult)
  const SaveDataToCookie = cookies().set("session",session,
  {
      httpOnly:true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
  })

  await prisma.userModel.create(
  { 
    data: 
    { 
        Genders: ServerValidationResult.data?.GenderFill as string,
        Email: ServerValidationResult.data?.EmailFill as string,
        Username: ServerValidationResult.data?.UsernameFill as string,
        Password: await bcrypt.hash(ServerValidationResult.data?.PasswordFill as string,10) 
    }
    // data :
    // {
    //   Genders: rawFormData.GenderData,
    //   Email: rawFormData.EmailData,
    //   Username: rawFormData.UsernameData,
    //   Password: rawFormData.PasswordData 
    // }
  })
    
  if(FormData != null)
  { 
    // console.log("Data cookie register: ")
    // console.log(SaveDataToCookie)
    // console.log()
    // console.log()
    // console.log()
    console.log("Data enkripsi register: ")
    console.log(session)
    // redirect("/pages")
  }
}