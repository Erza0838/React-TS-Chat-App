"use client"
import "../app/globals.css"
import React, { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "./ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select"
import { Button } from "./ui/button"

const formSchema = z.object(
{
  Genders: z.string().trim().min(8, 
  {
        message: "Gender minimal 8 karakter"
  }).max(9,
  {
    message: "Gender maksimal 9 karakter"
  }),
  Email: z.string().trim().min(4, 
  {
    message: "Email minimal 4 karakter"
  })
  .email("Email tidak valid")
  .max(30,
  {
    message: "Email maksimal 30 karakter"
  }),
  Username: z.string().trim().min(4, 
  {
    message: "Username minimal 4 karakter"
  }).max(30,
  {
    message: "Username maksimal 30 karakter"
  }),
  Password: z.string().trim().min(4, 
  {
    message: "Password minimal 4 karakter"
  }).max(30,
  {      
    message: "Password maksimal 30 karakter"
  })
  }
)

export default function RegisterFormComponent()
{   
  const [isLoading,setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>
  ({
    resolver: zodResolver(formSchema),
    defaultValues: 
    {
      Genders: "",
      Email: "",
      Username: "",
      Password: "",
    }
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>)
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
   <div className="flex justify-center mt-28">
      <div className="flex justify-center bg-cyan-900 w-80 h-96 rounded">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="Username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="text-base"/>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field}/>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Genders"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis kelamin</FormLabel>
                    <FormControl>
                      <Input type="text" {...field}/>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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