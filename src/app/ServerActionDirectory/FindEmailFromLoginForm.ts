"use server"
import { prisma } from "../Database"

export default async function VerifiedLoginEmail(LoginDataClientSide: FormData)
{   
    const ValidateLoginEmail = 
    {
        ValidateEmail: LoginDataClientSide.get("EmailVerification") as string
    }

    const FindEmailInDatabase = await prisma.userModel.findMany
    ({  
        where: { Email: ValidateLoginEmail.ValidateEmail },
        select: 
        {
            Email: true,
            Password: true
        }
    })
    
    if(Object.keys(FindEmailInDatabase).length !== 0)
    {   
        return {
            succes: "Email sudah terdaftar"
        }
    } 
    if(Object.keys(FindEmailInDatabase).length === 0)
    {   
        return {
            error: "Email tidak ada"
        }
    }
}