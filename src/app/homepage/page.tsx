// "use client"
// import React, { useEffect } from "react"
// import { useState } from "react"
import { SidebarComponents } from "@/Components/SidebarComponents"
import SearchContactComponent from "@/Components/SearchContactComponent"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface ContactInfo 
{
  ContactInformation: string
  ContactId: string
}

interface ContactDetailInformation 
{
  Id: string
  SaveName: string
}

export default async function Home() 
{ 
  // const [contact, setContact] = useState<ContactInfo[]>([])
  // useEffect(() => 
  // {
  //   async function FetchContacts() 
  //   {
  //     try 
  //     {
  //       const response = await fetch("/api/chat/showpersonalcontact")  
  //       if(!response.ok) 
  //       {
  //         throw new Error(`HTTP error! status: ${response.status}`)
  //       }
  //       const data = await response.json()
  //       if(data) 
  //       {
  //         console.log("Kontak saya :" + data)
  //         setContact(Array.isArray(data) ? data : []) 
  //       }
  //     }
  //     catch (error) 
  //     {
  //       console.error("Gagal mengambil data kontak", error)  
  //       setContact([])
  //     }
  //   }
  //   FetchContacts()
  // },[])
 const session = await getServerSession(authOptions)
 const FindContactOwner = await prisma.userModel.findFirst(
 {
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
      ContactInformation: 
      {
        path: "$.ContactId.SavedContactName",
        array_contains: 
      }
    },
    select: 
    {
      ContactInformation: true,
      MyId: true
    }
 })

  const parsedContacts = ChekContactOwnerId.map(contact => ({
    ...contact,
    ContactInformation: contact.ContactInformation as unknown as ContactDetailInformation // 👈 Ensure correct type
  }))

  return (
      <div className="flex flex-row">
        <SidebarComponents></SidebarComponents>
        <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16">
            <div className="flex flex-col gap-4 mx-3 my-6">
                <h4 className="text-zinc-400 font-bold">Obrolan</h4>
                <SearchContactComponent></SearchContactComponent>
                <div className="flex flex-col gap-6 my-5">
                {FindContactOwner ? (
                  <ul>
                    {ChekContactOwnerId.map((MyFriendsList) => 
                    {
                      return (
                        <li key={MyFriendsList.MyId} className="text-white cursor-pointer">
                         {JSON.stringify(MyFriendsList.ContactInformation)}
                        </li>
                      )
                    })}
                  </ul>
                ) : 
                (
                  <p className="text-white">Kontak kosong</p>
                )}
                </div>
            </div>
          </div>
      </div>
    )
}