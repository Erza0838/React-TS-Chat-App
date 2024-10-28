"use client"
import { Router } from "next/router"
import React, { useEffect, useState } from "react"
import { Prisma } from "@prisma/client"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"

interface ProfileData 
{
  Username: string,
  Email: string,
  Gender: string
}

// export default function ShowDetailsProfileComponent({params} : {params:{id: string}}) 
// { 
//   const id = params.id
//   const [CurrentEmail,SetOldEmail] = useState<string>("")
//   const [CurrentUsername,SetOldUsername] = useState<string>("")
//   const [CurrentGender,SetOldGender] = useState<string>("")

//   useEffect(() => 
//   {
//     GetProfileDataById()  
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[id])
  
//   const UpdateProfileData = async (event: React.FormEvent<HTMLFormElement>) =>
//   { 
//     event.preventDefault()
//     await fetch(`/api/detailsprofile/${id}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"   
//       },
//       body: JSON.stringify({
//         CurrentEmail,
//         CurrentUsername,
//         CurrentGender
//       })
//     }).then((response) => 
//     {
//       console.log(response)
//     }).catch((error) => 
//     {
//       console.log(error)
//     })
//   }
  
//   const GetProfileDataById = async () =>
//   {
//     const response = await fetch(`/api/detailsprofile/${id}`)
//     const json = await response.json() 
//     return json
//   }
//   return (
//     <div className="inline-block bg-cyan-950 h-lvh w-72 overflow-auto touch-pan-x absolute left-16">
//         <div className="flex flex-col gap-4 mx-3 my-6">
//             <h4 className="text-zinc-400 font-bold">Profile anda</h4>
//             <div className="flex flex-col gap-6 my-5">
//                   <form onSubmit={UpdateProfileData}>
//                     <div className="flex flex-col col-span-4 gap-9">
//                       <input type="text" value={CurrentUsername} onChange={ (event) => SetOldUsername(event.target.value)} className="text-white"/>
//                       <input type="email" value={CurrentEmail} onChange={ (event) => SetOldEmail(event.target.value)} className="text-white"/>
//                       <input type="text" value={CurrentGender} onChange={ (event) => SetOldGender(event.target.value)} className="text-white"/>
//                     </div>
//                   </form>
//             </div>
//         </div>
//     </div>
//   )
// }
