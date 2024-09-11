"use client"
import React from 'react'
// import SidebarComponents from './SidebarComponents'
import { UserModel } from '@prisma/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faMessage, faSquarePlus, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import ShowDetailsProfileComponent from '@/Components/ShowDetailsProfileComponent'
import SidebarComponents from '@/Components/SidebarComponents'

interface GetUserDataFromDatabase
{
  UserData: UserModel
}

export default function ProfilePageComponent() 
{ 
  return (
    <div className="flex flex-row">
      <SidebarComponents></SidebarComponents>
      <ShowDetailsProfileComponent params={{id:""}}></ShowDetailsProfileComponent>
    </div>
  )
}

