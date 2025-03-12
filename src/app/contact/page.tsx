// "use client"
import React, {Suspense} from "react"
import Home from "../homepage/page"

export default function ContactPage() 
{
  return (
    <Suspense fallback={<p>Memuat kontak...</p>}>
        <Home></Home>
    </Suspense>
  )
}
