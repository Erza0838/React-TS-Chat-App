"use client"
import "../app/globals.css"
import React from "react"
import { useRouter } from "next/navigation"
import { InsertNewAccountInformation } from "@/app/ServerActionDirectory/InsertRegisterDataToDatabase"
import { NewAccountDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import toast from "react-hot-toast"
import Link from "next/link"

export default function RegisterFormComponent()
{   
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
    // if(response?.error)
    // {
    //   toast.error()
    // }
  }

  return (
   <div>
    <div className="flex justify-center translate-y-12">
    <h1 className="text-white">Halaman register</h1>
  </div>
   <div className="flex justify-center mt-28">
      <div className="flex justify-center bg-cyan-900 w-96 h-96 rounded">
          <form action={RegisterPageClientActionValidation} className="flex flex-col gap-8 mt-10">
              <select name="Gender" className="outline-none pl-2">
                <option></option>
                <option>Laki laki</option>
                <option>Perempuan</option>
              </select>
              <input type="email" className="outline-none pl-2" placeholder="Email" name="Email" autoComplete="off"/>
              <input type="text" className="outline-none pl-2" placeholder="Username" name="Username" autoComplete="off"/>
              <input type="password" className="outline-none pl-2" placeholder="Password" name="Password" autoComplete="off"/>
                <div className="flex flex-row">
                  <Link href={"/pages"} className="text-white">Login jika sudah punya akun</Link>
                </div>
              <div className="flex flex-row gap-8 translate-y-2">
                <button type="submit" className="text-cyan-900 inline-block bg-white w-20 rounded">
                  Register
                </button>
                {/* <button className="text-cyan-900 inline-block bg-white w-20 rounded" onClick={() => router.push("/pages")}>
                  Login
                </button> */}
              </div>
          </form>
      </div>
   </div>
    </div>
  )
}