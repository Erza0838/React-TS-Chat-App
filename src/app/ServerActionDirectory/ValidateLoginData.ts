"use server"
import SecretToken from "@/lib/UpdateSession"
import { LoginDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import { prisma } from "../Database"
import bcrypt from "bcrypt"

// export const VerifiedNewAccount = async (LoginDataClientSide: unknown) =>
export default async function VerifiedNewAccount(LoginDataClientSide: FormData) 
{   
    const ValidateLoginData = 
    {
        ValidateEmail: LoginDataClientSide.get("EmailVerification") as string,
        ValidatePassword: LoginDataClientSide.get("PasswordVerification") as string
    }

    const FindLoginPasswordInDatabase = await prisma.userModel.findMany
    ({
        where: { Password: ValidateLoginData.ValidatePassword} ,
        select: 
        {
            Email: true,
            Password: true
        }
    }) 
    const FindEmailInDatabase = await prisma.userModel.findMany
    ({  
        where: { Email: ValidateLoginData.ValidateEmail },
        select: 
        {
            Email: true,
            Password: true
        }
    })
    if(FindEmailInDatabase != null)
    {
        console.log("Tampilkan email sesuai input :")
        console.log(FindEmailInDatabase)
    }
    if(FindEmailInDatabase == null)
    {
        console.log("Email tidak ada")
    }
    
    // Jika password dari tag input tidak sama dengan password yang ada di database
    // if(ValidateLoginData.ValidatePassword !== FindEmailInDatabase as unknown)
    // {
    // }
    // if(ValidateLoginData.ValidatePassword === FindEmailInDatabase as unknown)
    // {   
    //     console.log("Email sudah terdaftar")
    //     console.log("Data dari database sesuai email: ")
    //     console.log(FindEmailInDatabase) 
    //     return {
    //         sucses: "Email benar"
    //     }
    // }
}       