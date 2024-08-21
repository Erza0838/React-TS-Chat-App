"use client"
import React from "react"
import SidebarComponents from "@/Components/SidebarComponents"
import ShowContactComponent from "@/Components/ShowContactComponent"
import ShowEachContactChatPage from "@/Components/ShowEachContactChatComponent"

export default function HomeBaseOnId({ params }: { params:{UserId: string} }) 
{
  return (
    <>
    <div className="flex flex-row">
      {/* <SidebarComponents params={{id: ""}}></SidebarComponents>
      <ShowContactComponent></ShowContactComponent> */}
      <h1>Id User = `${params.UserId}`</h1>
    </div>
    </>
  )
}
