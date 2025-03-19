"use client"
import React, { useState } from 'react'
import { SidebarElement } from '@/app/SidebarElement'
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import toast from "react-hot-toast"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/Components/ui/button"
import { useSession } from "next-auth/react"

// Import zod object
import { UserContactIdValidationSchema } from "@/lib/validations/UserInformationValidation"

// Validasi zod
type UserContactIdFormValue = z.infer<typeof UserContactIdValidationSchema>

export default function AddContact() 
{
  const {data: session} = useSession()
  const [myLocation,setMyLocation] = useState<Location | null>(null)

  const AddNewContactForm = () =>
  { 
    const {register,handleSubmit,formState} = useForm<UserContactIdFormValue>({
      resolver: zodResolver(UserContactIdValidationSchema),
      defaultValues: 
      {
        UserContactId: "",
        SavedUsernameContact: ""
      }
    })
    return {register,handleSubmit,formState}
  }
  const {register: AddNewContact,handleSubmit: SubmitNewContact,formState: {errors: AddNewContactErrors}} = AddNewContactForm()

  const InsertNewContact:SubmitHandler<UserContactIdFormValue> = async (data: UserContactIdFormValue) => 
  {
    if(data.UserContactId === session?.user.id) 
    { 
      toast.error("Tidak bisa menambahkan id sendiri")
      return null
    }
    // if(data.UserContactId === session?.user.id) 
    // { 
    //   toast.error("Tidak bisa menambahkan id sendiri")
    //   return null
    // }
    try 
    {
      const response = await fetch("/api/add/addcontact", 
      {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if(!response.ok)
      {
        throw new Error("Network response error")
      }

      if(data.UserContactId !== session?.user.id) 
      {
        const result = await response.json()
        toast.success("Kontak ditambahkan")
        return result
      }
    } 
    catch (error) 
    {
      console.error(error) 
    }
  }

  function DeleteUnuseContactInformation() 
  {
    if(myLocation?.pathname === "/add/addcontact")
      {
        return 
      }
  }

  return (
    <div className="flex flex-row">
        <SidebarElement></SidebarElement>
        <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16  overflow-y-hidden">
          <div className="flex flex-col gap-7 mx-3 my`x-6">
            <div className="flex flex-row">
              <h2 className="text-white font-bold">Tambah kontak</h2>
            </div>
            <div className="flex flex-col">
              <form onSubmit={SubmitNewContact(InsertNewContact)}>
                <div className="flex flex-col gap-11">
                  <input type="text"
                          className="focus:outline-none rounded-lg pl-2 py-2 min-w-24 text-white bg-cyan-900 font-serif md:font-serif"
                          {...AddNewContact("UserContactId")}
                          placeholder="ID USER"/>
                  {AddNewContactErrors.UserContactId && <p className="text-red-500 absolute top-24">{AddNewContactErrors.UserContactId.message}</p>}
                  <input type="text"
                          className="focus:outline-none rounded-lg pl-2 py-2 min-w-24 text-white bg-cyan-900 font-serif md:font-serif"
                          {...AddNewContact("SavedUsernameContact")}
                          placeholder="NAMA"/>
                  <Button
                      type="submit"
                      style={{backgroundColor: "#FFFFFF", color: "#164e63", width: "15vw", fontSize: "1.2vw"}}>
                    Tambah  
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}