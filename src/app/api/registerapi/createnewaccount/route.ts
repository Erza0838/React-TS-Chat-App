import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"
import { encrypt } from "@/lib/UpdateSession"

interface NewAccountDataProops 
{
    params: 
    {
        Email: string,
        Username: string,
        Gender: string,
        Password: string
    }
}

export const POST = async (request: NextRequest) => 
{   
    const {Genders,Email,Username,Password} = await request.json()
    const InsertNewAccount = await prisma.userModel.create({ 
        data: 
        {
            Genders: Genders,
            Email: Email,
            Username: Username,
            Password: bcrypt.hashSync(Password, 10) 
        }
    })
    let session = await encrypt(InsertNewAccount)
    const SaveDataToCookie = cookies().set("session",session,
    {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production"
    })
    if(Object.keys(InsertNewAccount) != null && InsertNewAccount.id != null) 
    {
        return {
            success: "Akun berhasil dibuat",
            userid: InsertNewAccount.id
        }
    }
    return NextResponse.json({InsertNewAccount,SaveDataToCookie})   
}