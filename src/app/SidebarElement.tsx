"use client"
import { faClone, faMessage, faSquarePlus, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserModel } from '@prisma/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface GetUserDataFromDatabase
{
  UserData: UserModel
}

// const GetProfileId = async ({GetProfileData}: GetUserDataFromDatabase) => 
const GetProfileId = async () => 
{
    const response = await fetch(`/api/detailsprofile`)
    const json = await response.json() as GetUserDataFromDatabase
    return json 
}

// export const SidebarElement = async ({params}:{params: {id: string}}) =>
// Eksperimen ke-1 mengambil ID user
// export const SidebarElement = () =>
// {
//   const [ProfileInformation,setProfileIndormation] = useState<GetUserDataFromDatabase | null>(null)
//   useEffect(() => 
//   {
//     const fetchProfileData = async () => 
//     {
//       const data = await GetProfileId()
//       setProfileIndormation(data)
//     }
//   })

//   return (
//     <div className="inline-block bg-cyan-700 h-lvh z-10 drop-shadow-2xl">
//         <div className="flex flex-col gap-10 mx-6 my-3">
//             <FontAwesomeIcon icon={faMessage} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
//             <FontAwesomeIcon icon={faClone} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
//             <Link href={`/profilepage/${ProfileInformation?.UserData.id}`}>
//               <FontAwesomeIcon icon={faUserCircle} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
//             </Link>
//             <Link href={"/addcontactpage"}>
//               <FontAwesomeIcon icon={faSquarePlus} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
//             </Link>
//         </div>
//     </div>
//   )
// }

// Eksperimen ke-2 mengambil ID user
export const SidebarElement = ({UserData}: GetUserDataFromDatabase) =>
{
  return (
    <div className="inline-block bg-cyan-700 h-lvh z-10 drop-shadow-2xl">
        <div className="flex flex-col gap-10 mx-6 my-3">
            <FontAwesomeIcon icon={faMessage} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
            <FontAwesomeIcon icon={faClone} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
            <Link href={`/profilepage/${UserData.id}`}>
              <FontAwesomeIcon icon={faUserCircle} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
            </Link>
            <Link href={"/addcontactpage"}>
              <FontAwesomeIcon icon={faSquarePlus} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
            </Link>
        </div>
    </div>
  )
}