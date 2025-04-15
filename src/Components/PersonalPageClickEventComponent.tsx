"use client"
import React, { createContext, FC, useContext, useState } from "react"

interface PageProps 
{
  params: 
  {
    ContactId: string
    SavedContactName: string
  }
}

const PersonalChatPageComponent: FC<PageProps> = ({ params }: PageProps) =>
{ 
  return ( params.SavedContactName ? 
  (
    <div className="flex flex-col mx-60 size-full"> 
      <div className="block h-14 pl-96 size-lvw bg-cyan-800">
        <p className="text-white mx-5 my-2">{params.SavedContactName}</p>
      </div>
    </div> 
  ) : (
    <div className="flex flex-col mx-12"> 
      <p className="text-white">{params.ContactId}</p>
    </div> 
  ))  
}

export default PersonalChatPageComponent