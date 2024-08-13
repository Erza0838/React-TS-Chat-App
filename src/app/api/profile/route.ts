"use server"
import { PrismaClient } from "@prisma/client"
import { NextRequest,NextResponse } from "next/server"

const prisma = new PrismaClient()

// Function untuk menampilkan data user
export const ShowUserProfile = async (request: NextRequest) => 
{
    const ProfileData = await prisma.userModel.findMany(
    {

    })
}