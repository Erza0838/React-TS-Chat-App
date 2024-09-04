"use client"
import React from 'react'
import { UserModel } from '@prisma/client'
import { SidebarElement } from './SidebarElement'

// Ambil data user dari datbase 
const SelectUserDataById = async () => 
{
    const response = await fetch(process.env.URL_BACKEND + "api/detailsprofiles/" )
    const json = await response.json() as UserModel[]
    return json
}

// export default function Sidebar({params} : {params:{id: string}})
export const Sidebar = async () => {
const GetUserDataFromDatabase = await SelectUserDataById()
return (
    <div className="">
        <div className="">
            {GetUserDataFromDatabase.map((Key,Index) => 
            (
                <SidebarElement UserData={Key}>

                </SidebarElement>
            ))}
        </div>
    </div>
  )
}
