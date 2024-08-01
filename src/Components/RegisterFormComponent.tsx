"use client"
import React, { useEffect, useState } from "react"
import "../app/globals.css"
import { useRouter } from "next/navigation"
import { InsertNewAccountInformation } from "@/app/ServerActionDirectory/InsertRegisterDataToDatabase"
import { AccountDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import bcrypt from "bcrypt"
import toast from "react-hot-toast"

export default function RegisterFormComponent()
{   
  const [GenderData,setGenderData] = useState<string>("")
  const [EmailData,setEmailData] = useState<string>("")
  const [UsernameData,setUsernameData] = useState<string>("")
  const [PasswordData,setPasswordData] = useState<string>("")
  const router = useRouter()

  const ClientActionValidation = async (formData: FormData) => 
  { 
    const RegisterDataClientSide = 
    { 
        GenderFill: formData.get("Gender") as string,
        EmailFill: formData.get("Email") as string,
        UsernameFill: formData.get("Username") as string,
        PasswordFill: formData.get("Password") as string, 
    }
    const ValidationResult = AccountDataValidationSchema.safeParse(RegisterDataClientSide)
    if(!ValidationResult.success)
    {
        let ErrorMessage = ""
        ValidationResult.error.issues.forEach((issue) => 
        {
            ErrorMessage = ErrorMessage + issue.path[0] + ":" + issue.message + ". "
        })
        toast.error(ErrorMessage)
        return
    }
    const response = await InsertNewAccountInformation(ValidationResult.data)
  }

  return (
   <div>
    <div className="flex justify-center translate-y-12">
    <h1 className="text-white">Halaman register</h1>
  </div>
   <div className="flex justify-center mt-28">
      <div className="flex justify-center bg-cyan-900 w-96 h-96 rounded">
          {/* <form action={InsertNewAccountInformation} className="flex flex-col gap-8 mt-10"> */}
          <form action={ClientActionValidation} className="flex flex-col gap-8 mt-10">
              <select name="Gender" className="outline-none pl-2" value={GenderData} onChange={e => setGenderData(e.target.value)} >
                <option></option>
                <option>Laki laki</option>
                <option>Perempuan</option>
              </select>
              <input type="email" className="outline-none pl-2" placeholder="Email" name="Email" autoComplete="off" value={EmailData} onChange={e => setEmailData(e.target.value)}/>
              <input type="text" className="outline-none pl-2" placeholder="Username" name="Username" autoComplete="off" value={UsernameData} onChange={e => setUsernameData(e.target.value)}/>
              <input type="password" className="outline-none pl-2" placeholder="Password" name="Password" autoComplete="off" value={PasswordData} onChange={e => setPasswordData(e.target.value)}/>
                <div className="flex flex-row">
                  <p className="text-white">Login jika sudah punya akun</p>
                </div>
              <div className="flex flex-row gap-8 translate-y-2">
                <button type="submit" className="text-cyan-900 inline-block bg-white w-20 rounded">
                  Register
                </button>
                <button className="text-cyan-900 inline-block bg-white w-20 rounded" onClick={() => router.push("/pages")}>
                  Login
                </button>
              </div>
          </form>
      </div>
   </div>
    </div>
  )
}