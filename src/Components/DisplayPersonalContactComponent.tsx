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
    ContactId: string 
    SavedContactName: string | null
  }
}

const DisplayPersonalContactComponent: React.FC<PageProps> = ({ params }: PageProps) =>
{
  return (
    <>
        <PersonalChatPageComponent params=
        {{
            ContactId: params.ContactId, 
            SavedContactName: params.SavedContactName || "",
            PersonalMessageRecipientId: params.ContactId
        }}/>
    </>
  )
}

export default DisplayPersonalContactComponent