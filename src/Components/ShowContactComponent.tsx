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
    </>
  )
}