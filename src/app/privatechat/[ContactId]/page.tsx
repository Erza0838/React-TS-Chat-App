import { prisma } from "@/app/Database"
import ChatInputPersonalComponent from "@/Components/ChatInputPersonalComponent"
import PersonalContactComponent from "@/Components/PersonalContactComponent"
import SidebarWrapperComponent from "@/Components/WrapperComponents/SidebarWrapperComponent"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { getServerSession } from "next-auth"
import SearchContactWrapperComponent from "@/Components/WrapperComponents/SearchContactWrapperComponent"
import PressEscapekey from "@/Helper/KeyboardEventHandler"

export interface PageProps 
{
    params: 
    {
        ContactId: string
        SavedContactName?: string
    }
}

export interface ContactInfo 
{
  ContactInformation: string
  ContactId: string
  SavedContactName?: string
}

// const PrivateChatPage: FC<PageProps> = ({ params } : PageProps) => 
const PrivateChatPage = async ({ params } : PageProps) => 
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

    const contacts = ChekContactOwnerId.flatMap((contact) => 
    {
        // Assuming SavedContactId can be derived from ContactId
        const contactInfoArray = Array.isArray(contact.ContactInformation) ? (contact.ContactInformation as unknown as ContactInfo[]) : []  
        return contactInfoArray.map(info => 
        ({
            Contactid: info.ContactId,
            SavedContact: info.SavedContactName, 
            ...info
        }))
    })

    return (
        <div className="flex flex-row">
            <SidebarWrapperComponent/>
            <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16 no-scroll-bar">
                <div className="flex flex-col gap-4 mx-3 my-6">
                    <h4 className="text-zinc-400 font-bold">Obrolan</h4>
                    <SearchContactWrapperComponent/>
                    <div className="flex flex-col my-5 gap-6">
                        {FindContactOwner ? (
                            <ul className="flex flex-col gap-2">
                            {ChekContactOwnerId.map(contact => 
                            {
                                const contactInfoArray = Array.isArray(contact.ContactInformation) ? (contact.ContactInformation as unknown as ContactInfo[]) : []
                                return contactInfoArray.map(info => 
                                (
                                    <li key={info.ContactId} className="text-white cursor-pointer">
                                        {info.SavedContactName ? (
                                            // <Link href={`/privatechat/${info.ContactId}`}>
                                                <p className="underline underline-offset-4">
                                                    {info.SavedContactName}
                                                </p> 
                                            // </Link> 
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
                    </div>
                </div>
            </div>
            <div className="flex flex-col translate-x-80">
                <h1 className="text-white">{params.ContactId}</h1>
                {/* <ChatInputPersonalComponent/> */}
            </div>
        </div>
    )
}

export default PrivateChatPage