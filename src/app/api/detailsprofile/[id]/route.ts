import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => 
{
    const UserProfileId = params.id || ""
    const GetUserProfileById = await prisma.userModel.findFirst
    ({
        where: 
        {
            id: UserProfileId
        },
        select:
        {
            Email: true,
            Username: true
        }
    })
    return NextResponse.json({GetUserProfileById})
}