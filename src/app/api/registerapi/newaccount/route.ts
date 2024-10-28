import { prisma } from "@/app/Database"
import { NewAccountDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { encrypt } from "@/lib/UpdateSession"

export const POST = async (request: NextRequest) => 
{
    try 
    {
        const {Genders,Email,Username,Password} = await request.json()    
        const session = await encrypt({Genders,Email,Username,Password})
        const SaveDataToCookie = cookies().set("session",session,
        {
            httpOnly: true,
            path: "/createnewaccount",
            secure: process.env.NODE_ENV === "production"
        })

        const NewAccount = await prisma.userModel.create({
            data:   
            {
                Genders: Genders,
                Email: Email,
                Username: Username,
                Password: Password
            }
        })
        return NextResponse.json({NewAccount})
    } 
    catch (error) 
    {
        
    }
}