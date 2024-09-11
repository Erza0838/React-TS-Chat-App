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

// Eksperimen ke-2 mengambil ID user
export const SidebarElement = ({ UserData }: GetUserDataFromDatabase) =>
{ 
  console.log("Data user : " + JSON.stringify(UserData))  
  // console.log("ID user : " + UserData.id)
  return (
    <div className="inline-block bg-cyan-700 h-lvh z-10 drop-shadow-2xl">
        <div className="flex flex-col gap-10 mx-6 my-3">
            <FontAwesomeIcon icon={faMessage} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
            <FontAwesomeIcon icon={faClone} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
            <Link href={`/profilepage/${JSON.stringify(UserData.id)}`}>
            {/* <Link href={`/profilepage/${UserData.id}`}> */}
              <FontAwesomeIcon 
                icon={faUserCircle} 
                style={{color: "#ffffff"}}
                className="w-5 cursor-pointer"/>
            </Link>
            <Link href={"/addcontactpage"}>
              <FontAwesomeIcon icon={faSquarePlus} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
            </Link>
        </div>
    </div>
  )
}