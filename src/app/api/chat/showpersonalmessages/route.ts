import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"

const GET = async (request: NextRequest, response: NextResponse) => 
{
    const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findFirst({
        
    })
}