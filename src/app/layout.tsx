import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import { Toaster } from "react-hot-toast"
// import toast from "react-hot-toast"
import toast, { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      {/* <body className={`${inter.className} bg-stone-800`}> */}
      <body className={`${inter.className} bg-slate-400`}>
        {children}
        <Toaster position="top-center"></Toaster>
      </body>
    </html>
  );
}
