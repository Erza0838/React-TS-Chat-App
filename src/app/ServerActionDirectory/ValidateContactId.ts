"use server"

import { NextRequest,NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function ValidateNewContact(AddContactFormData: FormData)
{
    const NewContactData = AddContactFormData.get("UserContactId")
}