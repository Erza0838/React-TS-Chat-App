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
    Contact_Id: string 
    NamePersonalContact: string 
    FriendsContactId: string
    PersonalMessageReceiverId: string
  }
}

const DisplayPersonalContactComponent: React.FC<PageProps> = ({ params }: PageProps) =>
{
  const session = useSession()
  return (
    <>
        <PersonalChatPageComponent params=
        {{
            Contact_Id: params.Contact_Id, 
            NamePersonalContact: params.NamePersonalContact,
            PersonalMessageSenderId: session.data?.user.id!,
            FriendsContactId: params.FriendsContactId!,
            PersonalMessageReceiverId: params.PersonalMessageReceiverId!

            // PersonalChatOwnerId: params.PersonalcontactOwnerId!,
            // PersonalMessageRecipientId: params.ContactId,
            // PersonalContactOwnerId: params.PersonalcontactOwnerId!,
            // PersonalMessageId: params.PersonalMessageId
        }}/>
    </>
  )
}

export default DisplayPersonalContactComponent