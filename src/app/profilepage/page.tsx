// "use client"
import React from 'react'
import { UserModel } from '@prisma/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { SidebarComponents } from '@/Components/SidebarComponents'
import { getServerSession } from 'next-auth/next'
import { signOut, useSession } from 'next-auth/react'
import { SessionProviderProps } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { SidebarElement } from '../SidebarElement'
import SearchContactComponent from '@/Components/SearchContactComponent'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"
import { Input } from '@/Components/ui/input'
// import 
// {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "./ui/form"
import { faUserCircle,faEdit } from '@fortawesome/free-solid-svg-icons'

const ProfilePageComponent = async () =>
{ 
  const session = await getServerSession()

  const handleSignout = () => 
  {
    signOut()
  }

  return(
    <>
      <SidebarElement></SidebarElement>
      <div className="inline-block bg-cyan-950 h-lvh w-72 overflow-auto touch-pan-x absolute left-16">
        <div className="flex flex-col gap-7 mx-3 my-6">
          <div className="flex flex-col">
            <h2 className="text-white font-bold">Profie</h2>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col gap-2">
              <h4 className="text-zinc-400 font-bold">Nama</h4>
              <input type="text"
                     name="" 
                     className="focus:outline-none rounded-md px-1 py-1 min-w-24 text-white bg-cyan-950 focus:border-b-4 border-b-cyan-700" value={session?.user?.name ?? ""}/>     
            </div>  
            <div className="flex flex-row translate-y-10 translate-x-5">
              <FontAwesomeIcon 
                icon={faEdit} 
                style={{color: "#ffffff"}}
                className="cursor-pointer"/>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col gap-2">
              <h4 className="text-zinc-400 font-bold">Email</h4>
              <input type="text"
                     name="" 
                     className="focus:outline-none rounded-md px-1 py-1 min-w-24 text-white bg-cyan-950" value={session?.user?.email ?? ""} disabled/>
            </div>
            <div className="flex flex-row translate-y-10 translate-x-5">
              <FontAwesomeIcon 
                icon={faEdit} 
                style={{color: "#ffffff"}}
                className="cursor-pointer"/>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col gap-2">
              <h4 className="text-zinc-400 font-bold">Info</h4>
              <input type="text" 
                     name="" 
                     className="focus:outline-none rounded-md px-1 py-1 min-w-24 text-white bg-cyan-950 focus:border-b-4 border-b-cyan-700"/>
            </div>
            <div className="flex flex-row translate-y-10 translate-x-5">
              <FontAwesomeIcon
                icon={faEdit}
                style={{color: "#ffffff"}}
                className="cursor-pointer"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePageComponent