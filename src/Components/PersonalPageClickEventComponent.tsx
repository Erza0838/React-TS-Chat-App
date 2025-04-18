"use client"
import React, { createContext, FC, useContext, useState } from "react"
import TextareaAutoSize from "react-textarea-autosize"

interface PageProps 
{
  params: 
  {
    ContactId: string
    SavedContactName: string
  }
}

interface SenderPersonalMessage 
{
  SenderPersonalMessageId: string
  PersonalMessageText: string
  SenderPersonalMessageName: string
}

const PersonalChatPageComponent: FC<PageProps> = ({ params }: PageProps) =>
{ 
  const [Personalmessage, setPersonalMessage] = useState<string>("")
  // const [SenderPersonalMessageText, setSenderPersonalMessageText] = useState;

  const HandlePersonalMessageText = (event: React.ChangeEvent<HTMLTextAreaElement>) => 
  {
    setPersonalMessage(event.target.value)
  }

  const SendPersonalMessage = async (event: React.FormEvent<HTMLFormElement>) => 
  {
      event.preventDefault()
      try 
      {
        const PersonalMessageData = await fetch("/api/chat/personal", 
        {
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            SenderMessageId: params.ContactId,
            SenderMessageContactName: params.SavedContactName,
            PersonalMessageText: Personalmessage
          })
        })
        if(!PersonalMessageData.ok || PersonalMessageData.status !== 200) 
        {
          console.error("Gagal mengirim pesan")
          setPersonalMessage("") 
        }
        if(PersonalMessageData.ok || PersonalMessageData.status === 200) 
        {
          const PersonalMessageResponse = await PersonalMessageData.json()
          setPersonalMessage("") 
        }
      } 
      catch (error) 
      {
        console.error("Pesan pribadi error : " + error)
      }
  }

  // const GetSenderPersonalMessage = async () => 
  const GetSenderPersonalMessage = async (): Promise<SenderPersonalMessage> => 
  { 
    const SenderPersonalMessaegeData = await fetch("/api/chat/showpersonalmessages")
    const SenderPersonalMessaegeResponse = await SenderPersonalMessaegeData.json()
    console.log("Pesan pribadi : " + JSON.stringify(SenderPersonalMessaegeResponse)) 
    return SenderPersonalMessaegeResponse
    try 
    {
    } 
    catch (error) 
    {
      console.error(error)  
    }
  }
  GetSenderPersonalMessage()

  return ( params.SavedContactName ? (
    <div className="flex flex-col mx-7"> 
      <div className="inline-block h-16 min-w-[1200%] bg-cyan-800">
        <p className="text-white mx-5 my-2">{params.SavedContactName}</p>
         <div className="-z-10 w-[80vw] h-[100vh] translate-y-5 -translate-x-1 md:overflow-y-auto bg-slate-900">
            <div className="flex flex-col gap-5 mx-8 my-6">
                <p className="text-black bg-white w-20 h-6 text-center rounded-sm">
                </p>
            </div>
         </div>

        <form onSubmit={SendPersonalMessage} className="flex flex-row gap-11 absolute top-[90vh] min-w-[1100%] bg-cyan-800 h-16">
          <div className="flex flex-row gap-5 translate-x-8 translate-y-3">
            <TextareaAutoSize className="rounded-md h-16 focus:outline-none pl-6 resize-none"
                              placeholder="Ketik pesan"
                              value={Personalmessage}
                              onChange={HandlePersonalMessageText}/>
            <button className="bg-white rounded-md w-11 h-6">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div> 
  ) : (
    <div className="flex flex-col mx-6"> 
      <div className="inline-block h-14 min-w-[1200%] bg-cyan-800">
        <p className="text-white mx-5 my-2">{params.ContactId}</p>

         <div className="-z-10 translate-y-6 translate-x-3">
         </div>

        <form onSubmit={SendPersonalMessage} className="flex flex-row gap-11 absolute top-[90vh] min-w-[1200%] bg-cyan-800 h-16">
          <div className="flex flex-row gap-5 translate-x-8 translate-y-3">
            <TextareaAutoSize className="rounded-md h-16 focus:outline-none pl-6 resize-none" placeholder="Ketik pesan"/>
            <button className="bg-white rounded-md w-11 h-6">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div> 
  ))  
}

export default PersonalChatPageComponent