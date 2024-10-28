import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"

interface contextProops {
    params: {
        profileid: string
    }
}

export async function PATCH(request: NextRequest,context: contextProops)
{
    try 
    {
        const {params} = context   
        const body = await request.json()
        await prisma.userModel.update({
            where: 
            {
                id: params.profileid
            },
            data: 
            {
                Email: body.Email,
                Username: body.Username,
                id: body.id
            }
        })
        return NextResponse.json({message: "Update berhasil",status: 200})       
    } 
    catch (error) 
    { 
        return NextResponse.json({message: "Update gagal",status: 500})       
    }
}

export async function GET(request: NextRequest,context: contextProops) 
{
    try
    {   
        const {params} = context
        const AuthenticateUser = await prisma.userModel.findFirst({
            where: {
                id: params.profileid
            },
            select: {
                Email: true,
                Username: true,
                Genders: true
            }
        })    
        console.log(AuthenticateUser)
        return NextResponse.json(AuthenticateUser,{status: 200})
    } 
    catch (error)
    {
        return NextResponse.json({message: "Data tidak ada"},{status: 500})        
    }
}