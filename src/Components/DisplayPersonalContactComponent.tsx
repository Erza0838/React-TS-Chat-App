"use client"
import React, { useState } from 'react'
import PersonalChatPageComponent from './PersonalPageClickEventComponent'
import { useClickContext } from '@/useContext/PersonalChatContext'
import { ClickContactContext } from '@/useContext/PersonalChatContext'
import { ContactListProops } from '@/app/Interface/PersonalChatPageInterface'

interface PageProps 
{
  params: 
  {
    // chatid: string
    ContactId: string 
    SavedContactName: string | null
    // contactname: string
  }
}

const DisplayPersonalContactComponent: React.FC<PageProps> = ({ params }: PageProps) =>
{
    const context = useClickContext()
    const { Click, setClick } = context
    
  return (
    <div>
        {/* {selectedContact && (
            // <ClickContactContext.Provider value={{Click, setClick}}>
            // </ClickContactContext.Provider>  
        )} */}
        <PersonalChatPageComponent 
        params=
        {{
            ContactId: params.ContactId, 
            SavedContactName: params.SavedContactName || ""
        }}/>
    </div>
  )
}

export default DisplayPersonalContactComponent