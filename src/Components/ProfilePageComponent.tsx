"use client"
import React from 'react'
import SidebarComponents from './SidebarComponents'
import ShowDetailsProfileComponent from "./ShowDetailsProfileComponent"

export default function ProfilePageComponent() 
{ 
  return (
    <div className="flex flex-row">
      <SidebarComponents></SidebarComponents>
      <ShowDetailsProfileComponent params={{id:""}}></ShowDetailsProfileComponent>
    </div>
  )
}
