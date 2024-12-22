"use client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import SessionWrapper from "@/Components/SessionWrapper"
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
// import Providers from "@/components/Providers"
import toast, { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ["latin"] });
import
{
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body className={`${inter.className} bg-black overflow-y-hidden`}>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
        <SessionProvider>
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </SessionProvider>
        <Toaster position="top-center"></Toaster>
      </body>
    </html>
  )
}

function SessionWrapper({children} : {children: React.ReactNode})
{
  const {data: session,status} = useSession()

  console.log("Session status:" + status)
  console.log("Session data:" + JSON.stringify(session))

  if(status === "loading") 
  {
    return <div>
      Loading...
    </div>
  }
  if(status === "unauthenticated") 
  {
    return <div>
      Autentikasi gagal
    </div>
  }
  return <>{children}</>
}