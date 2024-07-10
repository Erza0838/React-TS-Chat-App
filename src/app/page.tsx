import Image from "next/image"
import "./globals.css"
import "../Components/CreateAccount"
import CreateAccount from "../Components/CreateAccount"
// import CreateAccountData from "./ClientApi/CreateAccountData"

export default function App()
{
  return (
   <>
    <h1 className="text-center text-white">Buat akun dulu guys</h1>
    <CreateAccount></CreateAccount>
    {/* <CreateAccountData></CreateAccountData> */}
   </>
  )
}
