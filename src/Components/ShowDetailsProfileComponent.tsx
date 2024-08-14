"use client"
import React from 'react'

export default function ShowDetailsProfileComponent() 
{
  return (
    <div className="inline-block bg-cyan-950 h-lvh w-72 overflow-auto touch-pan-x absolute left-16">
        <div className="flex flex-col gap-4 mx-3 my-6">
            <h4 className="text-zinc-400 font-bold">Profile anda</h4>
            <div className="flex flex-col gap-6 my-5">
                <p className="text-zinc-400">Nama</p>
                <p className="text-zinc-400">Email</p>
                <p className="text-zinc-400">Nama</p>
            </div>
        </div>
    </div>
  )
}
