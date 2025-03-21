// "use client"
import React, { FC } from "react"

interface PageProps 
{
  params: 
  {
    chatid: string
  }
}

const PersonalChatPage: FC<PageProps> = ({ params }: PageProps) =>
{ 
  // const {personalchatId} = params
  return (
    <div className="flex flex-col justify-center mx-14 z-10">
      <p className="text-white">ID : {params.chatid}</p>
      <p className="text-white">Obrolan pribadi</p>
    </div> 
  )
}

export default PersonalChatPage