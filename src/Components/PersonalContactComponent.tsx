import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import React from 'react'
import { prisma } from '@/app/Database'
import { Link } from 'lucide-react'

interface ContactInfo
{
    ContactInformation: string
    ContactId: string
    SavedContactName?: string
}

const PersonalContactComponent = async () =>
{
   const session = await getServerSession(authOptions)
   const FindContactOwner = await prisma.userModel.findFirst(
  {
    where: 
    {
        id: session?.user.id ?? ""
    }
  })
   
  const ChekContactOwnerId = await prisma.user_Contacts.findMany(
  {
    where: 
    {
        MyId: 
        {
        equals: session?.user.id ?? ""
        }
    },
    select: 
    {
        ContactInformation: true,
        MyId: true
    }
 })
 
  return (
    <>
     {FindContactOwner ? (
        <ul className="flex flex-col gap-2">
            {ChekContactOwnerId.map(contact => 
            {
                const contactInfoArray = Array.isArray(contact.ContactInformation) ? (contact.ContactInformation as unknown as ContactInfo[]) : []
                return contactInfoArray.map(info => 
                (
                <li key={info.ContactId} className="text-white cursor-pointer">
                    {info.SavedContactName ? 
                    (
                        <Link href={`/privatechat/${info.ContactId}`}>
                        <p className="underline underline-offset-4">
                            {info.SavedContactName}
                        </p> 
                        </Link> 
                    ) : (
                        <Link href={`/privatechat/${info.ContactId}`}>
                        <p className="underline underline-offset-4">
                            {info.ContactId}
                        </p>
                        </Link>
                    )}
                </li>
                ))
            })}
        </ul>) : (<p className="text-white">Kontak kosong</p>)
    }
    </>
  )
}

export default PersonalContactComponent
