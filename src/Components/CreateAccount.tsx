"use client"
import React, { useState } from "react"
import "../app/globals.css"
// import { Prisma } from "@prisma/client"
import { prisma } from "../app/Database"
import { useFormState } from "react-dom"
import InsertNewAccountInformation from "@/app/InsertDataToDatabase"

export default function CreateAccount() 
{ 
  const [GenderData,setGenderData] = useState<string>("")
  const [EmailData,setEmailData] = useState<string>("")
  const [UsernameData,setUsernameData] = useState<string>("")
  const [PasswordData,setPasswordData] = useState<string>("")

  return (
   <>
   <div className="flex justify-center translate-y-12">
      <h1 className="text-white">Halaman register</h1>
  </div>
   <div className="flex justify-center mt-28">
      <div className="flex justify-center bg-cyan-900 w-96 h-96 rounded">
          <form action={InsertNewAccountInformation} className="flex flex-col gap-8 mt-10">
              <input type="text" placeholder="Jenis kelamin" name="Gender" autoComplete="off" value={GenderData} onChange={e => setGenderData(e.target.value)} required/>
              <input type="text" placeholder="Email" name="Email" autoComplete="off" value={EmailData} onChange={e => setEmailData(e.target.value)} required/>
              <input type="text" placeholder="Username" name="Username" autoComplete="off" value={UsernameData} onChange={e => setUsernameData(e.target.value)} required/>
              <input type="password" placeholder="Password" name="Password" autoComplete="off" value={PasswordData} onChange={e => setPasswordData(e.target.value)} required/>
              <button type="submit" className="text-cyan-900 inline-block bg-white w-20 rounded">Register</button>
          </form>
      </div>
   </div>
   </>
  )
}
