"use client"
import React, { useState } from "react"
import "../app/globals.css"
// import { Prisma } from "@prisma/client"
import { prisma } from "../app/Database"
import InsertNewAccountInformation from "@/app/InsertDataToDatabase"
// import { authenticate } from '@/app/lib/actions'

export default function CreateAccount() 
{
  const [GenderData,setGenderData] = useState<string>("")
  const [EmailData,setEmailData] = useState<string>("")
  const [UsernameData,setUsernameData] = useState<string>("")
  const [PasswordData,setPasswordData] = useState<string>("")

  return (
   <>
   <div className="flex justify-center my-11">
        <form action={InsertNewAccountInformation}>
            <input type="text" placeholder="Jenis kelamin" name="Gender" value={GenderData} onChange={e => setGenderData(e.target.value)} required/>
            <br />
            <br />
            <input type="text" placeholder="Email" name="Email" value={EmailData} onChange={e => setEmailData(e.target.value)} required/>
            <br />
            <br />
            <input type="text" placeholder="Username" name="Username" value={UsernameData} onChange={e => setUsernameData(e.target.value)} required/>
            <br />
            <br />
            <input type="text" placeholder="Password" name="Password" value={PasswordData} onChange={e => setPasswordData(e.target.value)} required/>
            <br />
            <br />
            <button type="submit">Simpan</button>
        </form>
   </div>
   </>
  )
}
