"use client"
import React from 'react'
import SidebarComponents from './SidebarComponents'

export default function ProfilePageComponent() {
  return (
    <div className="flex flex-row">
      <SidebarComponents></SidebarComponents>
      <h1 className="text-white">Nama</h1>
    </div>
  )
}
