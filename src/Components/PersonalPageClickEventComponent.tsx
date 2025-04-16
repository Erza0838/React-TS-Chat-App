"use client"
import React, { createContext, FC, useContext, useState } from "react"
import ChatInputPersonalComponent from "./ChatInputPersonalComponent"
import TextareaAutoSize from "react-textarea-autosize"

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
    <div className="flex flex-col mx-7"> 
      <div className="inline-block h-14 min-w-[1200%] bg-cyan-800">
        <p className="text-white mx-5 my-2">{params.SavedContactName}</p>

         <div className="-z-10 translate-y-6 translate-x-3">
         </div>

        <form className="flex flex-row gap-11 absolute top-[90vh] min-w-[1100%] bg-cyan-800 h-16">
          <div className="flex flex-row gap-5 translate-x-8 translate-y-3">
            <TextareaAutoSize className="rounded-md h-16 focus:outline-none pl-6 resize-none" placeholder="Ketik pesan"/>
            <button className="bg-white rounded-md w-11 h-6">Kirim</button>
          </div>
        </form>
      </div>
    </div> 
  ) : (
    <div className="flex flex-col mx-6"> 
      <div className="inline-block h-14 min-w-[1100%] bg-cyan-800">
        <p className="text-white mx-5 my-2">{params.ContactId}</p>

         <div className="-z-10 translate-y-6 translate-x-3">
         </div>

        <form className="flex flex-row gap-11 absolute top-[90vh] min-w-[1100%] bg-cyan-800 h-16">
          <div className="flex flex-row gap-5 translate-x-8 translate-y-3">
            <TextareaAutoSize className="rounded-md h-16 focus:outline-none pl-6 resize-none" placeholder="Ketik pesan"/>
            <button className="bg-white rounded-md w-11 h-6">Kirim</button>
          </div>
        </form>
      </div>
    </div> 
  ))  
}

export default PersonalChatPageComponent