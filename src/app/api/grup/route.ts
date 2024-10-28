import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"

interface NewAccountDataProops {
    params: {
        Email: string,
        Username: string,
        Gender: string,
        Password: string
    }
}

// export const POST = async (request: NextRequest ) => 
// {
//     try 
//     {

//     } 
//     catch (error) 
//     {
        
//     }
// }

export const GET = async (request: NextRequest,response: NextResponse ) => 
{
   await prisma.userModel.findMany({
    
   })
    return NextResponse.json({})   
}