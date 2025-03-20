"use client"
import "../app/globals.css"
import React, { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "./ui/input"
import 
{
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Button } from "./ui/button"
import { NewAccountDataValidationSchema } from "@/lib/validations/UserInformationValidation"
import { register } from "module"

export default function RegisterFormComponent()
{   
  const [isLoading,setLoading] = useState<boolean>(false)
  // const InsertAndUpdateDescriptionProfileForm = () =>
  //   {
  //     const { register, handleSubmit,formState } = useForm<DescriptionFormValue>(
  //     {
  //       resolver: zodResolver(DescriptionProfileSchema),
  //       defaultValues:
  //       {
  //         UserDescription: "",
  //       }
  //     })
  //     return { register, handleSubmit, formState}
  //   }
  //   const {register: InsertAndUpdateDescriptionProfile,handleSubmit: InsertAndUpdatehandleDescriptionProfileSubmit,formState: {errors: InsertAndUpdateDescriptionProfileErrors}} = InsertAndUpdateDescriptionProfileForm()

  // const InsertRegisterData = () => 
  // {
    
  // }


  const form = useForm<z.infer<typeof NewAccountDataValidationSchema>>
  ({
    resolver: zodResolver(NewAccountDataValidationSchema),
    defaultValues: 
    {
      Genders: "",
      Email: "",
      Username: "",
      Password: "",
    }
  })
  
  async function onSubmit(values: z.infer<typeof NewAccountDataValidationSchema>)
  {
    setLoading(true)
    try 
    { 
      const response = await fetch("/api/registerapi/createnewaccount/",
      {
        headers: 
        {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(values)
      })
      const data = await response.json()
      if(data.error)
      {
          toast.error(data.error)
      }
      else 
      {
        toast.success("Akun berhasil dibuat")
      }
      if(!response.ok) 
      {
        throw new Error("Network response error")
      }
    } 
    catch (error) 
    {
      console.log(error)
    }
    finally
    {
      setLoading(false)
    }
  }

  return (
   <div>
    <div className="flex justify-center translate-y-12"> 
    <h1 className="text-white">Halaman register</h1>
   </div>
   <div className="flex justify-center mt-20">
      <div className="flex justify-center bg-cyan-900 w-80 h-96 rounded">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-11 pt-7">
            <FormField
              control={form.control}
              name="Username"
              render={({ field }) => (
                <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Username" className="font-medium"/>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Email" className="font-medium"/>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                    <FormControl>
                      <Input type="password" {...field} placeholder="Password" className="font-medium"/>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            <FormField
              control={form.control}
              name="Genders"
              render={({ field }) => (
                <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Jenis kelamin" {...field}/>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* <Select name="Genders" aria-controls={form.control}>
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Laki laki" className="font-medium">
                      Laki laki
                    </SelectItem>
                    <SelectItem value="Perempuan" className="font-medium">
                      Perempuan
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select> */}
            <div className="flex flex-row">
              <Link href={"/login"} className="text-white">Login jika sudah punya akun</Link>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
    </div>
  )
}