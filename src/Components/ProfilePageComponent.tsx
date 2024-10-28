"use client"
import React from 'react'
import { SidebarComponents } from './SidebarComponents'
import ShowDetailsProfileComponent from "./ShowDetailsProfileComponent"
import { SidebarElement } from '@/app/SidebarElement'
import { UserModel } from '@prisma/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faMessage, faSquarePlus, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

interface GetUserDataFromDatabase
{
  UserData: UserModel
}

export default function ProfilePageComponent() 
{ 
  return (
    <div className="flex flex-row">
      <ShowDetailsProfileComponent params={{id:""}}></ShowDetailsProfileComponent>  
    </div>
  )
}
