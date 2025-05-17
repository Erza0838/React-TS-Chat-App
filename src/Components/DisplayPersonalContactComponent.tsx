"use client"
import React, { useState } from 'react'
import PersonalChatPageComponent from './PersonalPageClickEventComponent'
import { useClickContext } from '@/useContext/PersonalChatContext'
import { ClickContactContext } from '@/useContext/PersonalChatContext'
import { ContactListProops } from '@/app/Interface/PersonalChatPageInterface'
import { useSession } from "next-auth/react"

interface PageProps 
{
  params: 
  {
    ContactId: string 
    SavedContactName: string | null
    // PersonalMessageId: string
    // PersonalcontactOwnerId: string
  }
}

const DisplayPersonalContactComponent: React.FC<PageProps> = ({ params }: PageProps) =>
{
  const session = useSession()
  return (
    <>
        <PersonalChatPageComponent params=
        {{
            ContactId: params.ContactId, 
            SavedContactName: params.SavedContactName || "",
            PersonalMessageRecipientId: params.ContactId,
            PersonalMessageSenderId: session.data?.user.id!,
            // PersonalContactOwnerId: params.PersonalcontactOwnerId!,
            // PersonalMessageId: params.PersonalMessageId
        }}/>
    </>
  )
}

export default DisplayPersonalContactComponent