"use client"
import "../app/globals.css"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
// import Router from "next/router"
import { InsertNewAccountInformation } from "@/app/ServerActionDirectory/InsertRegisterDataToDatabase"
import { NewAccountDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import toast from "react-hot-toast"
import Link from "next/link"

export default function RegisterFormComponent()
{   
  const [GenderState,SetGender] = useState<string>("")
  const [EmailState,SetEmail] = useState<string>("")
  const [UsernameState,SetUsername] = useState<string>("")
  const [PasswordState,SetPassword] = useState<string>("")
  const [isLoading,setLoading] = useState<boolean>(false)
  const RegisterBtn : HTMLElement | null = document.getElementById("RegisterButton")
  const router = useRouter()

  const RegisterPageClientActionValidation = async (formData: FormData) => 
  { 
    const RegisterDataClientSide = 
    { 
        GenderFill: formData.get("Gender") as string,
        EmailFill: formData.get("Email") as string,
        UsernameFill: formData.get("Username") as string,
        PasswordFill: formData.get("Password") as string, 
    }
    const ValidationResult = NewAccountDataValidationSchema.safeParse(RegisterDataClientSide)
    if(!ValidationResult.success)
    {
        let RegisterErrorMessage = ""
        ValidationResult.error.issues.forEach((issue) => 
        {
            RegisterErrorMessage = RegisterErrorMessage + issue.path[0] + ":" + issue.message + ". "
        })
        toast.error(RegisterErrorMessage)
        return
      }
    const response = await InsertNewAccountInformation(ValidationResult.data)
    setLoading(true)
  }

  const DisplayNoneRegisterButton = () => 
  {
    RegisterBtn!.className="hidden"
    router.push("login")
  }

  return (
   <div>
    <div className="flex justify-center translate-y-12">
    <h1 className="text-white">Halaman register</h1>
   </div>
   <div className="flex justify-center mt-28">
      <div className="flex justify-center bg-cyan-900 w-80 h-96 rounded">
          <form action={RegisterPageClientActionValidation} className="flex flex-col gap-8 mt-10">
              <select name="Gender" className="outline-none pl-2" value={GenderState} onChange={(e) => SetGender(e.target.value)}>
                <option></option>
                <option>Laki laki</option>
                <option>Perempuan</option>
              </select>
              <input type="email" className="outline-none pl-2" placeholder="Email" name="Email" autoComplete="off" value={EmailState} onChange={(e) => SetEmail(e.target.value)}/>
              <input type="text" className="outline-none pl-2" placeholder="Username" name="Username" autoComplete="off" value={UsernameState} onChange={(e) => SetUsername(e.target.value)}/>
              <input type="password" className="outline-none pl-2" placeholder="Password" name="Password" autoComplete="off" value={PasswordState} onChange={(e) => SetPassword(e.target.value)}/>
                <div className="flex flex-row">
                  <Link href={"/login"} className="text-white">Login jika sudah punya akun</Link>
                </div>
                <div className="flex flex-col translate-y-2">
                  <button type="submit" onClick={DisplayNoneRegisterButton} className="text-cyan-900 inline-block bg-white w-20 rounded" id="RegisterButton">
                    Register
                  </button>
                  <button className="text-cyan-900 hidden bg-white w-20 rounded -mt-6">
                    Loading...
                  </button>
                </div>

              {isLoading ? (
                <div className="flex flex-row gap-8 -mt-6">
                  <button className="text-cyan-900 inline-block bg-white w-20 rounded">
                    Loading...
                  </button>
              </div>
              ): true}
          </form>
      </div>
   </div>
    </div>
  )
}