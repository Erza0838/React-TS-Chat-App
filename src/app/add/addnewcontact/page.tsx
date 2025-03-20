"use client"
import React from "react"
import { SidebarComponents } from "@/Components/SidebarComponents"
import { prisma } from "@/app/Database"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"
import { UserContactIdValidationSchema } from "@/lib/validations/UserInformationValidation"
import { SidebarElement } from "@/app/SidebarElement"
import { Button } from "@/Components/ui/button"
import { useForm } from "react-hook-form"

// import ErrorPage from "@/app/ServerActionDirectory/error/page"

export default function page() 
{   
    // Validasi zod
    type UserContactIdFormValue = z.infer<typeof UserContactIdValidationSchema>
    const AddNewContactForm = () =>
    { 
    const {register,handleSubmit,formState} = useForm<UserContactIdFormValue>(
    {
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

 return (
    <div className="flex flex-row">
        <SidebarElement></SidebarElement>
        <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16  overflow-y-hidden">
            <div className="flex flex-col gap-7 mx-3 my`x-6">
            <div className="flex flex-row">
                <h2 className="text-white font-bold">Tambah kontak</h2>
            </div>
            <div className="flex flex-col">
                <form>
                    <div className="flex flex-col gap-11">
                        <input type="text"
                                className="focus:outline-none rounded-lg pl-2 py-2 min-w-24 text-white bg-cyan-900 font-serif md:font-serif"
                                {...AddNewContact("UserContactId")}
                                placeholder="ID USER"/>
                        {/* {AddNewContactErrors.UserContactId && <p className="text-red-500 absolute top-24">{AddNewContactErrors.UserContactId.message}</p>} */}
                        <input type="text"
                                className="focus:outline-none rounded-lg pl-2 py-2 min-w-24 text-white bg-cyan-900 font-serif md:font-serif"
                                {...AddNewContact("SavedUsernameContact")}
                                placeholder="NAMA"/>
                        <Button type="submit"style={{backgroundColor: "#FFFFFF", color: "#164e63", width: "15vw", fontSize: "1.2vw"}}>
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