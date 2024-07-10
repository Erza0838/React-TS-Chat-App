"use client"
import React, { useState } from "react"
import "../globals.css"
// import { Prisma } from "@prisma/client"
import { prisma } from "../app/Database"
// import { authenticate } from '@/app/lib/actions'

export default function CreateAccount() 
{
  const [GenderData,setGenderData] = useState<string>("")
  const [EmailData,setEmailData] = useState<string>("")
  const [UsernameData,setUsernameData] = useState<string>("")
  const [PasswordData,setPasswordData] = useState<string>("")

//  const CallDatabase = prisma.userModel.

  return (
   <>
   <div className="flex justify-center my-11">
        <form>
            <input type="text" placeholder="Jenis kelamin" value={GenderData} onChange={e => setGenderData(e.target.value)} required/>
            <br />
            <br />
            <input type="text" placeholder="Email" value={EmailData} onChange={e => setEmailData(e.target.value)} required/>
            <br />
            <br />
            <input type="text" placeholder="Username" value={UsernameData} onChange={e => setUsernameData(e.target.value)} required/>
            <br />
            <br />
            <input type="text" placeholder="Password" value={PasswordData} onChange={e => setPasswordData(e.target.value)} required/>
            <br />
            <br />
            <button type="submit">Simpan</button>
        </form>
   </div>
   </>
  )
}
