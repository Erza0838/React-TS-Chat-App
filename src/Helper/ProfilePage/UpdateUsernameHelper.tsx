"use client"
import React,{useState} from "react"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { UpdateUsernameValidationSchema } from "@/lib/validations/UserInformationValidation"
import { reloadSession } from "@/lib/ReloadSession"
import toast from "react-hot-toast"

export default function UpdateUsernamHelperFunction () 
{
    const {data: session, update} = useSession()

    // State untuk tag input update profile
    const [UpdateUsername,SetUpdateUsername] = useState<string>("")

    type UpdateUsernameFormValues = z.infer<typeof UpdateUsernameValidationSchema>

    const UpdateUsernameProfileForm = () => 
    {
        const { register, handleSubmit, formState } = useForm<UpdateUsernameFormValues>
        ({
            resolver: zodResolver(UpdateUsernameValidationSchema)
        })
        return { register, handleSubmit, formState } 
    }
    const {register,handleSubmit,formState: {errors}} = UpdateUsernameProfileForm()

    const onSubmit = async (data: UpdateUsernameFormValues) => 
    {
        try 
        {
        const response = await fetch("/api/profileapi/updateusernameprofile",
        {
            method: "PUT",
            headers: 
            {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data.Username)
        }) 
        if(!response.ok) 
        {
            throw new Error("Network response error")
        }
        const result = await response.json()
        if(result.error) 
        {
            toast.error(result.error)
            return
        }
        if(session && session.user) 
        {
            try 
            {
            await update({
                ...session,
                user: 
                {
                    ...session?.user,
                    name: data.Username
                }
            })
            SetUpdateUsername(data.Username)
            reloadSession() 
            } 
            catch (error) 
            {
                console.log("Error update session : " + error) 
                toast.error("Update username gagal")
            }
        }
        } 
        catch(error) 
        {
            console.error("Error submit form : " + error)
        }
        finally
        {
            toast.success("Username diubah!")
        }
    }

    useEffect(() => 
    {
        if(session && session.user.name) 
        {
            SetUpdateUsername(session.user.name)
        }
    },[session])
}