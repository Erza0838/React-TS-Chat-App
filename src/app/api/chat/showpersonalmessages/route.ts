import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const GET = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findFirst({
        where: 
        {
            My_Messages: 
            {
                path: "$.SenderPersonalMessaeId",
                equals: session?.user.id ?? ""
            }
        }
    })
    switch(GetSenderPersonalMessage) 
    {
        case GetSenderPersonalMessage :
        {
            console.log("Pesan pribadi : " + GetSenderPersonalMessage)
            return NextResponse.json({GetSenderPersonalMessage}, {status: 200})
        } 
        case null :
        {
            console.log("Pesan pribadi tidak ada")
            return NextResponse.json({error: "Pesan pribadi tidak ada"}, {status: 400})
        } 
    }
}