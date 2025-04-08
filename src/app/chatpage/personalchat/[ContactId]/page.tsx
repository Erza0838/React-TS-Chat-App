"use client"
import React, { FC, useState, useContext, createContext } from "react"

interface PageProps 
{
  params: 
  {
    ContactId: string
    SavedContactName: string
  }
}

// const PersonalChatPage = () =>
const PersonalChatPage: FC<PageProps> = ({ params }: PageProps) =>
{   
  console.log("params", params.ContactId)
  // const [Click, setClick] = useState({ClickUserContact: false})
   if(!params.ContactId) 
   {
     return <p className="text-white">Tidak ada ID Kontak</p>    
   }
   if(params.ContactId) 
   {
    return <div>
            <p className="text-white">{params.ContactId}</p>
            <p className="text-white">Halaman obrolan</p>
           </div>
   }
}

export default PersonalChatPage