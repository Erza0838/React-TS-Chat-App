"use client"
import "../app/globals.css"
import React, { useState } from "react"
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/Components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form"
import { Button } from '@/Components/ui/button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from "next/link"

const formSchema = z.object(
{
    Email: z.string().trim().min(4, 
    {
        message: "Email minimal 4 karakter"
    }),
    Password: z.string().trim().min(4, 
    {
        message: "Password minimal 4 karakter"
    }).max(30,
    {      
        message: "Password maksimal 30 karakter"
    })
})

export default function LoginFormComponent() 
{   
    const [isLoading,setLoading] = useState<boolean>(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>
    ({
        resolver: zodResolver(formSchema),
        defaultValues: 
        {
            Email: "",
            Password: ""
        }
    })

    async function onsubmit(values: z.infer<typeof formSchema>) 
    {
        setLoading(true)
        try 
        {
            const response = await signIn("credentials",
            {   
                callbackUrl: "/homepage",
                redirect: false,
                email: values.Email,
                password: values.Password,
            })    
            if(!response?.error)
            {
                router.push("/homepage")
            }
            if(response?.error)
            {   
                if(response.error === "CredentialsSign") 
                {
                    toast.error("Email atau password salah!")
                }
                else 
                {
                    toast.error("Terjadi kesalahan saat login")
                }
            }
            if(!response?.ok) 
            {
                throw new Error("Network response error")   
            }
            if(response?.ok)
            {
                toast.success("Akun terdaftar!")
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
    <>
        <div className="flex justify-center translate-y-12">    
            <h1 className="text-white">Login Page</h1>
        </div>
        <div className="flex justify-center mt-28">
            <div className="flex justify-center bg-cyan-900 w-80 h-72 rounded">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="Email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input {...field}  className="text-base"/>
                                </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField
                            control={form.control}
                            name="Password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                    <FormControl>
                                    <Input type="password" {...field} className="text-base"/>
                                    </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}/>
                        <div className="flex flex-row">
                            <Link href={"/"} className="text-white">Belum punya akun?</Link>
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    </>
  )
}