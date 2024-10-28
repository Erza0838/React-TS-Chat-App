"use client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import { Toaster } from "react-hot-toast"
// import toast from "react-hot-toast"
import SessionWrapper from "@/Components/SessionWrapper"
import { SessionProvider } from "next-auth/react"
import toast, { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <body className={`${inter.className} bg-black overflow-y-hidden`}>
          {children}
          <Toaster position="top-center"></Toaster>
        </body>
      </html>
    </SessionProvider>   
  )
}
