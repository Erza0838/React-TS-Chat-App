"use client"
import React from 'react'
import { SidebarElement } from '@/app/SidebarElement'
import { UserModel } from '@prisma/client'

interface Model 
{
  model: UserModel
}

export default function SidebarComponents() 
{ 
  return (
    <>  
      <SidebarElement UserData=
      {{
        id: "",
        Genders: "",
        Email: "",
        Username: "",
        Password: ""
      }}></SidebarElement>
    </>
  )
}
