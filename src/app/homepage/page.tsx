"use client"
import React from "react"
import SidebarComponents from "@/Components/SidebarComponents"
import ShowContactComponent from "@/Components/ShowContactComponent"
import ShowEachContactChatPage from "@/Components/ShowEachContactChatComponent"

export default function Home() 
{
  return (
    <div className="flex flex-row">
      <SidebarComponents></SidebarComponents>
      <ShowContactComponent></ShowContactComponent>
    </div>
  )
}
