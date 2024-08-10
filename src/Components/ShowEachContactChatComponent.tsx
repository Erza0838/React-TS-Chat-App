"use client"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"

export default function ShowEachContactChatPage()
{
  return(
    <>
    <div className="bg-slate-800 hidden h-10 min-w-60">
      <div className="flex flex-row">
        <FontAwesomeIcon icon={faUserCircle} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
        <p className="text-white">Nama</p>
      </div>
    </div>    
    <div className="bg-cyan-700 hidden h-10 min-w-60">
      <div className="flex flex-row">
        <form action="">
            <input type="text" name="" placeholder="ketik pesan" className="focus:outline-none rounded-md px-1 py-1 min-w-24"/>
        </form>
      </div>
    </div>    
    </>
  )
}
