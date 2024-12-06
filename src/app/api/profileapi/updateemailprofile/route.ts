import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const PUT = async (request: NextRequest,response: NextResponse) => 
{
    const RawEmail = await request.text()
    const CleandEmail = RawEmail.replace(/"/g,'')
    const session = await getServerSession(authOptions)
    try 
    {
        
    } 
    catch (error) 
    {
        
    }
}