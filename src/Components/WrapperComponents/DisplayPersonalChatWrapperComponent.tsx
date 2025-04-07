"use client"

import { EventContextInterface } from '@/useContext/PersonalChatContext'
import React, { useState } from 'react'
import { ClickContactContext } from "@/useContext/PersonalChatContext"
import DisplayPersonalContactComponent from '../DisplayPersonalContactComponent'
import { ContactListProops } from '@/app/Interface/PersonalChatPageInterface'

const DisplayPersonalChatWrapperComponent: React.FC<ContactListProops> = ({contacts}) =>
{
  const [Click, setClick] = useState<EventContextInterface>({ClickUserContact: false})
  return (
    <ClickContactContext.Provider value={{ Click, setClick}}>
        {/* <DisplayPersonalContactComponent params={{}}/> */}
    </ClickContactContext.Provider>    
  )
}

export default DisplayPersonalChatWrapperComponent
