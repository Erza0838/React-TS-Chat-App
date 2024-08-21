"use client"
import React from 'react'
import { SidebarElement } from '@/app/SidebarElement'
import { UserModel } from '@prisma/client'

export default function SidebarComponents() 
{ 
  return (
    <>  
      <SidebarElement UserData={{Username:"", Email: "", Genders: "", id: "", Password: ""}}></SidebarElement>
    </>
  )
}
