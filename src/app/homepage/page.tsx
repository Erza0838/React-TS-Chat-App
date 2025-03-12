// "use client"
import React from "react"
import { SidebarComponents } from "@/Components/SidebarComponents"
import SearchContactComponent from "@/Components/SearchContactComponent"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "../Database"

interface ContactInfo 
{
  SaveContactName?: string
  FriendId: string
}

export default async function Home() 
{ 
  const session = await getServerSession(authOptions)
  const FindContactOwner = await prisma.userModel.findFirst({
      where: 
      {
          id: session?.user.id ?? ""
      }
  })

 const ChekContactOwnerId = await prisma.user_Contacts.findMany(
 {
  where: 
  {
    MyId: 
    {
      equals: session?.user.id ?? ""
    },
    // ContactInformation: 
    // {
    //   path: '$[*].ContactId',
    //   array_contains: session?.user.id 
    // }
  },
  select: 
  {
    ContactInformation: true
  }
})
console.log("Kontak ID ranggas : " + JSON.stringify(ChekContactOwnerId))

const GetContactId = await prisma.user_Contacts.findMany(
{
    where: 
    {
      ContactInformation: 
      {
        path: '$[*].ContactId',
        array_contains: 'cm3ch89u10000z925dyv4s4bm'
      }
    }
})
    
  return (
    <div className="flex flex-row">
      <SidebarComponents></SidebarComponents>
      <div className="inline-block bg-cyan-950 h-lvh w-72 overflow-auto touch-pan-x absolute left-16">
          <div className="flex flex-col gap-4 mx-3 my-6">
              <h4 className="text-zinc-400 font-bold">Obrolan</h4>
              <SearchContactComponent></SearchContactComponent>
              <div className="flex flex-col gap-6 my-5">
                {FindContactOwner ? (
                  <ul>
                    <li className="text-white">
                      {/* {JSON.stringify(GetContactId)} */}
                    </li>
                    {/* {ChekContactOwnerId.map((MyFriendsList) => 
                    {
                      return (
                        <li key={FindContactOwner.id} className="text-white">
                         {JSON.stringify(MyFriendsList.ContactInformation)}
                        </li>
                      )
                    })} */}
                  </ul>
                ) : (
                  <p className="text-white">Kontak kosong</p>
                )}
              </div>
          </div>
         </div>
    </div>
  )
}