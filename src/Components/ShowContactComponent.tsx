"use client"
import React, { HtmlHTMLAttributes } from 'react'
import { useRef } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from "@fortawesome/free-solid-svg-icons"
import SearchContactComponent from "@/Components/SearchContactComponent"

// Import client function

export default function ShowContactComponent() 
{
  const ClickEachContactIcon = useRef<HTMLDivElement>(null)

  function ShowPersonalChat()
  {
    // ClickEachContactIcon.current?.style.display = "flex"
  }
  return (
    <>  
        <div className="inline-block bg-cyan-950 h-lvh w-96 overflow-auto touch-pan-x">
            <div className="flex flex-col gap-4 mx-3 my-6">
                <h4 className="text-zinc-400 font-bold">Obrolan</h4>
                <SearchContactComponent></SearchContactComponent>
                <div className="flex flex-col gap-6 my-5" onClick={ShowPersonalChat}>
                    <div className="flex flex-row gap-10 cursor-pointer">
                        <FontAwesomeIcon icon={faUserCircle} style={{color: "#ffffff"}} className="w-10 aspect-square"/>
                        <p className="text-white translate-y-2">Zeva</p>
                    </div>
                    <div className="flex flex-row gap-10 cursor-pointer">
                        <FontAwesomeIcon icon={faUserCircle} style={{color: "#ffffff"}} className="w-10 aspect-square"/>
                        <p className="text-white translate-y-2">Zeva</p>
                    </div>
                    <div className="flex flex-row gap-10 cursor-pointer">
                        <FontAwesomeIcon icon={faUserCircle} style={{color: "#ffffff"}} className="w-10 aspect-square"/>
                        <p className="text-white translate-y-2">Zeva</p>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="flex flex-row">
            <div className="bg-slate-800 inline h-10 min-w-60">
                <div className="flex flex-">
                <FontAwesomeIcon icon={faUserCircle} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
                <p className="text-white">Nama</p>
                </div>
            </div>    
            <div className="bg-cyan-700 inline h-10 min-w-60">
                <div className="flex flex-row">
                <form action="">
                    <input type="text" name="" placeholder="ketik pesan" className="focus:outline-none rounded-md px-1 py-1 min-w-24"/>
                </form>
                </div>
            </div>    
        </div> */}
    </>
  )
}
