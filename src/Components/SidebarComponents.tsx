"use client"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMessage} from "@fortawesome/free-solid-svg-icons"
import {faClone} from "@fortawesome/free-solid-svg-icons"
import {faUserCircle} from "@fortawesome/free-solid-svg-icons"
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons"
export default function SidebarComponents() 
{
  return (
    <>  
        <div className="inline-block bg-cyan-700 h-lvh z-10 drop-shadow-2xl">
            <div className="flex flex-col gap-10 mx-6 my-3">
                <FontAwesomeIcon icon={faMessage} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
                <FontAwesomeIcon icon={faClone} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
                <FontAwesomeIcon icon={faUserCircle} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
                <FontAwesomeIcon icon={faSquarePlus} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
            </div>
        </div>
    </>
  )
}
