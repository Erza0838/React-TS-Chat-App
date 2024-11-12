import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

export const POST = async (req: NextRequest,res: NextResponse) =>
{   
    const session = await getServerSession()
    const username = session?.user.name
    return NextResponse.json({username})
}