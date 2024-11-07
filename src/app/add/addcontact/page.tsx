import React from 'react'
import { SidebarElement } from '@/app/SidebarElement'

export default function AddContact() 
{
  return (
    <div className="flex flex-row">
        <SidebarElement></SidebarElement>
        <h1 className="text-white">Tambah kontak baru</h1>
    </div>
  )
}
