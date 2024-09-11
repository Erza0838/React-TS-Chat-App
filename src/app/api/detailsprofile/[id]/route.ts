import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const GET = async (request: NextRequest, context: { params: { id: string } }) => 
{
    const UserProfileId = context.params.id || ""
    const GetUserProfileById = await prisma.userModel.findFirst
    ({
        where: {
            id: UserProfileId
        },
        select: {
            Email: true,
            Username: true,
            Genders: true
        }
    })
    return NextResponse.json({ GetUserProfileById })
    // return NextResponse.json({UserProfileId})
}