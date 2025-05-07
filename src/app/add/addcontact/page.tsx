"use client"
import React, { useState } from 'react'
import { SidebarElement } from '@/app/SidebarElement'
import z, { set } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import toast from "react-hot-toast"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/Components/ui/button"
import { useSession } from "next-auth/react"

// Import zod object
import { UserContactIdValidationSchema } from "@/lib/validations/UserInformationValidation"

// Validasi zod
type UserContactIdFormValue = z.infer<typeof UserContactIdValidationSchema>

interface AddNewContactResponse 
{
  error?: string
  success?: boolean
}

export default function AddContact() 
{
  const {data: session} = useSession()
  const AddNewContactForm = () =>
  { 
    const {register,handleSubmit,formState,reset,setError} = useForm<UserContactIdFormValue>(
    {
      resolver: zodResolver(UserContactIdValidationSchema),
      defaultValues: 
      {
        UserContactId: "",
        SavedUsernameContact: ""
      }
    })
    return {register,handleSubmit,formState,reset,setError}
  }
  const {register: AddNewContact,handleSubmit: SubmitNewContact,formState: {errors: AddNewContactErrors}, reset, setError} = AddNewContactForm()

  const InsertNewContact:SubmitHandler<UserContactIdFormValue> = async (data: UserContactIdFormValue) => 
  {
    if(data.UserContactId === session?.user.id) 
    { 
      toast.error("Tidak bisa menambahkan id sendiri")
      reset()
      return null
    }
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
      const result: AddNewContactResponse = await response.json()
      if(!response.ok)
      { 
        // console.log(response.error)
        toast.error(result.error || "Tambah kontak gagal")
        reset()
        return 
      }

      if(data.UserContactId !== session?.user.id && response.ok)  
      {
        toast.success("Kontak ditambahkan")
        reset()
        return result
      }
    } 
    catch (error) 
    {
      console.error(error) 
      toast.error("Terjadi kesalahan")
      reset()
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