"use server"
import { prisma } from "../Database"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { encrypt } from "@/lib/UpdateSession"
import { NewAccountDataValidationSchema } from "@/lib/validations/UserInformationValidation"

export const InsertNewAccountInformation = async (RegisterDataClientSide: unknown) =>
{ 
  const ServerValidationResult = NewAccountDataValidationSchema.safeParse(RegisterDataClientSide)
  let session = await encrypt(ServerValidationResult)
  const SaveDataToCookie = cookies().set("session",session,
  {
      httpOnly:true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
  })

  try
  {
    const InsertNewAccount = await prisma.userModel.create
    ({ 
      data: 
      { 
          Genders: ServerValidationResult.data?.GenderFill as string,
          Email: ServerValidationResult.data?.EmailFill as string,
          Username: ServerValidationResult.data?.UsernameFill as string,
          Password: await bcrypt.hash(ServerValidationResult.data?.PasswordFill as string,10) 
      }
    })
    if(Object.keys(InsertNewAccount) != null)
    {
      return {
        success: "Akun berhasil dibuat"
      }
    }
  }
  catch (error)
  {
    return {
      error: ServerValidationResult.error?.issues
    }   
  }
}