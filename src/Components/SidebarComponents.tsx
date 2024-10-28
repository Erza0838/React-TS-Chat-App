"use client"
import React from 'react'
import { SidebarElement } from '@/app/SidebarElement'
import { prisma } from '@/app/Database'

export async function SidebarComponents() 
{ 
  return (
    <>  
      <SidebarElement></SidebarElement>
    </>
  )
}
