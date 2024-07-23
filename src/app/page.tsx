"use client"

import Image from "next/image"
import "./globals.css"
import "../Components/CreateAccount"
import CreateAccount from "../Components/CreateAccount"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function App()
{
  return (
   <>
    <CreateAccount></CreateAccount>
   </>
  )
}
