"use client"
import React, { useState } from "react"
import { SidebarComponents } from "@/Components/SidebarComponents"
import SearchContactComponent from "@/Components/SearchContactComponent"
import { useEffect } from "react"

type Contact = 
{
  ContactId: string,
  ContactInformation: {Email: string; Name?: string}
}

export default function Home() 
{ 
  const [ContactLit, SetContactList] = useState<Contact[]>([])
  const [Loading, SetLoading] = useState<boolean>(true)

  useEffect(() => 
  {
    async function ShowContactList() 
    {
      try 
      {
        const response = await fetch("/api/chat/showpersonalcontact")  
        const ContactListData:Contact[] = await response.json()
        SetContactList(ContactListData)
        console.log("Daftar kontak : " + ContactListData)
        if(!response.ok) 
        {
          throw new Error("Kontak bermasalah : " + response.statusText)
        }
      } 
      catch(error)
      {
        console.error(error)  
      }
      finally
      {
        SetLoading(false)
      }
    }
    ShowContactList()
  }, [])

  return (
    <div className="flex flex-row">
      <SidebarComponents></SidebarComponents>
      <div className="inline-block bg-cyan-950 h-lvh w-72 overflow-auto touch-pan-x absolute left-16">
          <div className="flex flex-col gap-4 mx-3 my-6">
              <h4 className="text-zinc-400 font-bold">Obrolan</h4>
              <SearchContactComponent></SearchContactComponent>
              <div className="flex flex-col gap-6 my-5">
              </div>
          </div>
         </div>
    </div>
  )
}