import React from 'react'
import { SidebarElement } from '@/app/SidebarElement'
import { ContactListProops } from '@/app/Interface/PersonalChatPageInterface'

export interface PageProps 
{
    params: 
    {
        ContactId: string
        SavedContactName?: string
    }
}

// const SidebarWrapperComponent: React.FC<ContactListProops> = ({ contacts }) =>
const SidebarWrapperComponent = () =>
{
  return (
    // <SidebarElement contacts={contacts}></SidebarElement>
    <SidebarElement></SidebarElement>
  )
}

export default SidebarWrapperComponent
