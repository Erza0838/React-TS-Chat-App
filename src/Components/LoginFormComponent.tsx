"use client"
import "../app/globals.css"
import React, { useState } from "react"
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/Components/ui/input"
import { Button } from '@/Components/ui/button'
import { signIn } from "next-auth/react"
import { redirect, useRouter } from 'next/navigation'
import Link from "next/link"
import 
{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { LoginDataValidationSchema } from "@/lib/validations/UserInformationValidation"

export default function LoginFormComponent() 
{   
    const [isLoading,setLoading] = useState<boolean>(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof LoginDataValidationSchema>>
    ({
        resolver: zodResolver(LoginDataValidationSchema),
        defaultValues: 
        {
            email: "",
            password: ""
        }
    })

    async function onsubmit(values: z.infer<typeof LoginDataValidationSchema>) 
    {
        setLoading(true)
        try 
        {
            const response = await signIn("credentials",
            {   
                callbackUrl: "/contact",
                redirect: false,
                email: values.email,
                password: values.password,
            })    

            if(!response) 
            {
                throw new Error("No response from auth server")
            }

            if(response.error)
            {   
                console.log("Error response : " + response.error)                        
                toast.error(response.error || "Login gagal!")
                return 
                // if(response.error === "CredentialsSignin") 
                // {
                //     toast.error(response.error || "Login gagal!")
                //     return 
                //     redirect("/login")
                // }
            }
            if(response.ok) 
            {
                toast.success("Login berhasil!")
                router.push("/contact")
            }
        } 
        catch(error: any) 
        {
            console.error(error)
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                                <FormControl>
                                <Input {...field}  className="text-base"/>
                                </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-white">Password</FormLabel>
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