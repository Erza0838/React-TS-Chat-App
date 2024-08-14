"use server"
import { PrismaClient } from "@prisma/client"
import { NextRequest,NextResponse } from "next/server"
const prisma = new PrismaClient()

// Function untuk menampilkan data user
// export const GetUserProfile = async (request: NextRequest,{params}: {params:{id: string}}) => 
// {   
//     const response = await fetch(process.env.URL_BACKEND + `/api/profile${params.id}`, 
//     {
//         next: {revalidate: 10},
//         headers: {
//             "Content-Type": "application/json",
//         },   
//     })   
//     const result = await response.json()
//     return NextResponse.json(result)
// }

// export const ShowUserProfile = async (request: NextRequest,{params}: {params:{id: string}}) => 
// {   
//     const body = await request.json()
//     const response = await fetch(process.env.URL_BACKEND + `/api/profile${params.id}`, 
//     {
//         method: "POST",
//         headers: {
//             "Content-Type":"application/json",
//         },
//         body: JSON.stringify(body)
//     })   
//     const result = await response.json()
//     return NextResponse.json(result)
// }

export const GET = async (request: NextRequest) => 
{
    return NextResponse.json({message: "Halaman profile"})
}