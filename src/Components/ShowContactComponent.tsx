"use client"
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from "@fortawesome/free-solid-svg-icons"
import SearchContactComponent from "@/Components/SearchContactComponent"

export default function ShowContactComponent() 
{
  return (
    <>  
        <div className="inline-block bg-cyan-950 h-lvh w-72 overflow-auto touch-pan-x absolute left-16">
            <div className="flex flex-col gap-4 mx-3 my-6">
                <h4 className="text-zinc-400 font-bold">Obrolan</h4>
                <SearchContactComponent></SearchContactComponent>
                <div className="flex flex-col gap-6 my-5">
                </div>
            </div>
        </div>
        {/* <div className="flex flex-col gap-40 mx-72 overflow-hidden">
            <div className="bg-slate-800 hidden h-14 w-96" id="NameAndPictureHeader">
                <div className="flex flex-row">
                    <FontAwesomeIcon icon={faUserCircle} style={{color: "#ffffff"}} className="w-5 cursor-pointer"/>
                    <p className="text-white">Nama</p>
                </div>
            </div>    
            <div className="bg-cyan-700 hidden h-16 w-96" id="InputMessages">
                <div className="flex flex-row my-4">
                    <form action="">
                        <input type="text" name="" placeholder="ketik pesan" className="focus:outline-none rounded-md px-1 py-1 min-w-24"/>
                    </form>
                </div>
            </div>    
        </div> */}
    </>
  )
}