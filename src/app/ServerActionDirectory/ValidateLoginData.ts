"use server"
import SecretToken from "@/lib/UpdateSession"
import { LoginDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import { prisma } from "../Database"
import toast from "react-hot-toast"

// export const VerifiedNewAccount = async (LoginDataClientSide: unknown) =>
// export const VerifiedNewAccount = async (Prevstate: any,LoginDataClientSide: FormData) =>
export default async function VerifiedNewAccount(LoginDataClientSide: FormData) 
{   
    // const ValidateLoginData = LoginDataValidationSchema.safeParse(
    // {
    //     ValidateEmailFill: LoginData.get("EmailVerification"),
    //     ValidatePasswordFill: LoginData.get("PasswordVerification")
    // })
    // const FindLoginDataInDatabase = await prisma.userModel.findMany({
    //     where: { Password: ValidateLoginData.data?.ValidatePasswordFill},
    //     select: 
    //     {
    //         Email: true,
    //         Password: true
    //     }
    // })
    // if(ValidateLoginData.data?.ValidateEmailFill !== FindLoginDataInDatabase as unknown)
    // {
    //     console.log("Password salah")
    // }
    // else 
    // {
    //     console.log(FindLoginDataInDatabase)
    // }

    // const ServerSideLoginValidationResult = LoginDataValidationSchema.safeParse(LoginDataClientSide)
    // if(!ServerSideLoginValidationResult.success)
    // {
    //     let AuthenticationErrorMessage = ""
    //     ServerSideLoginValidationResult.error.issues.forEach((issue) => 
    //     {
    //         AuthenticationErrorMessage = AuthenticationErrorMessage + issue.path[0] + ":" + issue.message + "."
    //     })
    //     return 
    //     {
    //         errors: LoginDataClientSide
    //     }
    // }
    // try 
    // {
    //     const FindLoginDataInDatabase = await prisma.userModel.findMany({
    //         where: { Password: ServerSideLoginValidationResult .data?.ValidatePasswordFill},
    //         select: 
    //         {
    //             Email: true,
    //             Password: true
    //         }
    //     })
    //     if(ServerSideLoginValidationResult.success)
    //     {
    //         if()
    //         {
    
    //         }
    //     }
    //     console.log(FindLoginDataInDatabase)   
    // } 
    // catch (error)
    // {
    //     console.log(error)
    // }

    const ValidateLoginData = LoginDataValidationSchema.safeParse(
    {
        ValidateEmailFill: LoginDataClientSide.get("EmailVerification"),
        ValidatePasswordFill: LoginDataClientSide.get("PasswordVerification")
    })
    const FindLoginDataInDatabase = await prisma.userModel.findMany({
        where: { Password: ValidateLoginData.data?.ValidatePasswordFill},
        select: 
        {
            Email: true,
            Password: true
        }
    })
    if(ValidateLoginData.success)
    {
        console.log("Data user login : ")
        console.log("")
        console.log("")
        console.log("")
        console.log(FindLoginDataInDatabase)
    }
    else 
    {   
        console.log(ValidateLoginData.error?.issues)
        // return 
        // {
        //     errors: ValidateLoginData.error?.issues
        // }
    }
}       