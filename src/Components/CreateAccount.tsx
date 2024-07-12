"use client"
import React, { useState } from "react"
import "../app/globals.css"
// import { Prisma } from "@prisma/client"
import { prisma } from "../app/Database"
import { useFormState } from "react-dom"
// import { authenticate } from '@/app/lib/actions'

// Eksperimen
import InsertNewAccountInformation from "@/app/InsertDataToDatabase"

export default function CreateAccount() 
{ 
  // const [state, formAction] = useFormState(InsertNewAccountInformation, null)

  const [GenderData,setGenderData] = useState<string>("")
  const [EmailData,setEmailData] = useState<string>("")
  const [UsernameData,setUsernameData] = useState<string>("")
  const [PasswordData,setPasswordData] = useState<string>("")
  const [IdData,setIdData] = useState<string>("")

  return (
   <>
   <div className="flex justify-center my-11">
        {/* <form action={formAction}> */}
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
            {/* <input type="text" placeholder="id" name="id" value={IdData} onChange={e => setIdData(e.target.value)} required/>
            <br />
            <br /> */}
            <button type="submit">Simpan</button>
        </form>
   </div>
   </>
  )
}
