"use client"
import React, { FC } from 'react'
import { SidebarElement } from '../../../SidebarElement'

interface PageProps 
{
  params: 
  {
    personalChatId: string
  }
}

const PersonalChatPage: FC<PageProps> = ({ params }: PageProps) =>
{
  return (
    <div className="flex flex-row">
      <p>Obrolan pribadi</p>
    </div>
  )
}

export default PersonalChatPage