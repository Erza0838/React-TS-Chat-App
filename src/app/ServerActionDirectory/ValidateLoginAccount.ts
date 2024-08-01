"use server"
import SecretToken from "@/lib/UpdateSession"

export default async function VerifiedNewAccount(data: FormData)
{
    const LoginData = 
    {
        EmailData: data.get("EmailVerification") as string,
        PasswordData: data.get("PasswordVerification") as string
    }

    console.log("Secret token login: ")
    console.log(SecretToken)
}       