import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/Database"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async (request: NextRequest, response: NextResponse) => 
{   
    const session = await getServerSession(authOptions)
    // const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findMany({
    //     select: 
    //     {
    //         My_Messages: true
    //     }
    // })
    const GetSenderPersonalMessage = await prisma.personal_Chat_Model.findFirst({
        where: 
        {
            My_Messages: 
            {
                path: "$.SenderPersonalMessageId",
                equals: session?.user.id ?? ""
            },
            Messages_To_All: 
            {
                path: "$.SenderPersonalMessageId",
                equals: session?.user.id ?? ""
            }
        }
    })
    if(GetSenderPersonalMessage?.My_Messages !== null) 
    {
        console.log("Pesan pribadi : " + JSON.stringify(GetSenderPersonalMessage))
        return NextResponse.json(JSON.stringify(GetSenderPersonalMessage), {status: 200})
    }
    if(GetSenderPersonalMessage?.My_Messages === null) 
    {
        console.log("Pesan pribadi kosong")
        return NextResponse.json({error: "Pesan pribadi kosong"}, {status: 400})
    }
    // switch(GetSenderPersonalMessage) 
    // {
    //     case GetSenderPersonalMessage :
    //     {
    //         console.log("Pesan pribadi : " + JSON.stringify(GetSenderPersonalMessage))
    //         return NextResponse.json(JSON.stringify(GetSenderPersonalMessage), {status: 200})
    //     } 
    //     case null :
    //     {
    //         console.log("Pesan pribadi tidak ada")
    //         return NextResponse.json({error: "Pesan pribadi tidak ada"}, {status: 400})
    //     } 
    // }
}