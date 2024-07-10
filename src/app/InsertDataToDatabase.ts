"use server"
// import CreateAccount from "@/Components/CreateAccount"
import CreateAccountData from "./ClientApi/CreateAccountData"
import { prisma } from "./Database"

export default async function InsertNewAccountInformation(data: FormData)
{   
  const GenderData = data.get("Gender")
  const EmailData = data.get("Email")
  const UsernameData = data.get("Username")
  const PasswordData = data.get("Email")
  console.log(GenderData)

  if(typeof GenderData !== "string" || GenderData.length === 0)
  {
    throw new Error("Invalid")  
  }
  await prisma.userModel.create({
    data:{ 
        Genders: GenderData,
        Email: EmailData,
        Username: UsernameData,
        Password: PasswordData
    },
  })
}