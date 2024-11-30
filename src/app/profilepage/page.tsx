"use client"
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { faUserCircle,faEdit,faCheck,faClipboard,faSmile } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/Components/ui/button'
import { SidebarElement } from '../SidebarElement'

// Baris akhir import component
import EmojiPicker from '@/Components/ui/EmojiPicker'
import EmojiComponent from '@/Components/ui/Emoji'
import { UpdateUsernameValidationSchema } from '@/lib/validations/UserInformationValidation'
import { reloadSession } from '@/lib/ReloadSession'

// Bagian untuk import Array 
import { Emoji } from '@/Helper/ProfilePage/EmojiList'
import { Emoji2 } from '@/Helper/ProfilePage/EmojiList'

const ProfilePageComponent = () =>
{ 
  const {data: session, update} = useSession()

  // useRef untuk input tag
  const AutoFocusInputNameRef = useRef<HTMLInputElement>(null)
  const DisplayNoneInputNameRef = useRef<HTMLInputElement>(null)
  const AutoFocusInputEmailRef = useRef<HTMLInputElement>(null)
  const DisplayNoneInputEmailRef = useRef<HTMLInputElement>(null)
  const AutoFocusInputInformationRef = useRef<HTMLInputElement>(null)
  const DisplayNoneInputInformationRef = useRef<HTMLInputElement>(null)

  // useRef untuk update button
  const SubmitNewUsernameWithEnterKeyRef = useRef<HTMLButtonElement>(null)

  // State untuk tombol emoji
  const [ShowEmojiComponent,SetShowEmojiComponent] = useState<boolean>(false)

  // State untuk mouse event
  let [EditNameClickEvent,setEditNameClickEvent] = useState<boolean>(false)
  let [EditEmailClickEvent,setEditEmailClickEvent] = useState<boolean>(false)
  let [EditInformationClickEvent,setEditInformationClickEvent] = useState<boolean>(false)
  const [ChecklistIconInNameInput,setChecklistIconInNameInput] = useState<boolean>(false)
  const [SelectedEmoji,SetSelectedEmoji] = useState<string>("")

  console.log("Emoji : " + SelectedEmoji)

  // // useRef untuk tombol emoji
  const ShowEmojiPickerRef = useRef<HTMLDivElement>(null)

  // Bagian function untuk emoji
  // Function untuk menghilangkan emoji picker
  function HideEmojiPickerWithEscKey(event: React.KeyboardEvent<SVGSVGElement>) 
  {
    switch(event.key) 
    { 
      case "Escape" : 
      {
          if(ShowEmojiPickerRef.current) 
          {
            ShowEmojiPickerRef.current.style.display = "none"
          }
      }
      break
    }
  }

  const ChoseEmoji = (ClickEmoji: string) =>
    {
      SetSelectedEmoji(ClickEmoji)
    }

  // Function untuk menampilkan emoji picker
  function ShowEmojiPicker()
  {
    if(ShowEmojiComponent === true) 
    {   
      return <div className="flex flex-row justify-center w-56 absolute left-80 top-8 z-10 rounded-sm">        
              {Emoji.unicode.map((emoji,index) => 
                ( 
                  <span key={index} dangerouslySetInnerHTML={{__html: emoji}} className="cursor-pointer bg-cyan-700" onClick={() => ChoseEmoji(emoji)}/> 
                ))
              }
              <div className="flex flex-col">
                {Emoji2.unicode.map((emoji,index) => 
                  ( 
                    <div key={index} className="flex flex-row">
                      <span key={index} dangerouslySetInnerHTML={{__html: emoji}} className="cursor-pointer bg-cyan-700" onClick={() => ChoseEmoji(emoji)}/>      
                    </div>
                  ))
                }
              </div>
            </div>
    }
  }
  // Baris akhir function emoji

  // State untuk tag input update profile
  const [UpdateUsername,SetUpdateUsername] = useState<string>("")
  const [UpdateEmail,SetUpdateEmail] = useState<string>("")
  const [UpdatInformation,SetUpdateInformation] = useState<string>("")
  // const [Emoji,SetEmoji] = useState<string>("")

  useEffect(() => 
  {
    if(session && session.user.name) 
    {
      SetUpdateUsername(session.user.name)
    }
  },[session])


  // Validasi zod username
  type UpdateUsernameFormValues = z.infer<typeof UpdateUsernameValidationSchema>

  const UpdateUsernameProfileForm = () => 
  {
    const { register, handleSubmit, formState } = useForm<UpdateUsernameFormValues>
    ({
      resolver: zodResolver(UpdateUsernameValidationSchema)
    })
    return { register, handleSubmit, formState } 
  }
  const {register,handleSubmit,formState: {errors}} = UpdateUsernameProfileForm()
  
  const SubmitNewUsername:SubmitHandler<UpdateUsernameFormValues>  = async (data: UpdateUsernameFormValues) => 
  {
    console.log("Submitted data: ",data)
    try 
    {                                              
      const response = await fetch("/api/profileapi/updateusernameprofile",
      {
        method: "PUT",
        headers: 
        {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          Username: data.Username
        })
      }) 
      if(!response.ok) 
      {
          throw new Error("Network response error")
      }
      const result = await response.json()
      if(result.error) 
      {
        toast.error(result.error)
        return
      }
      if(session && session.user) 
      {
        try 
        {
          await update({
            ...session,
            user: 
            {
              ...session?.user,
              name: data.Username,
              emoji: SelectedEmoji
            }
          })
          SetUpdateUsername(data.Username)
          reloadSession() 
        } 
        catch (error) 
        {
          console.log("Error update session : " + error) 
          toast.error("Update username gagal")
        }
      }
    } 
    catch(error) 
    {
      console.error("Error submit form : " + error)
    }
    finally
    {
      toast.success("Username diubah!")
    }
  }
  // Baris akhir validasi zod username
  
  // Bagian keyboard event "ESC" untuk mengembalikan input disable
  const DisabledEditName = (event: React.KeyboardEvent<HTMLInputElement>) =>
  {
    switch(event.key) 
    {
      case "Escape" : setEditNameClickEvent(false)
                      if(DisplayNoneInputNameRef.current) 
                      {
                        DisplayNoneInputNameRef.current.style.display = "block"   
                      }
        break
    }
  }
  const DisabledEditEmail = (event: React.KeyboardEvent<HTMLInputElement>) =>
  {
    switch(event.key) 
    {
      case "Escape" : setEditEmailClickEvent(false)
        break
    }
  }
  const DisabledEditInformation = (event: React.KeyboardEvent<HTMLInputElement>) =>
  {
    switch(event.key) 
    {
      case "Escape" : setEditInformationClickEvent(false)
        break
    }
  }
  // Bagian akhir keyboard event "ESC" input disable

  // Bagian keyboard event "ESC" untuk menghilangkan tombol edit
  const DisabledChecklistIconInInputName = (event: React.KeyboardEvent<HTMLInputElement>) => 
  {
    switch(event.key) 
    {
      case "Escape" : setEditNameClickEvent(false)
        break
    }
  }

  const DisabledChecklistIconInInputEmail = (event: React.KeyboardEvent<HTMLInputElement>) => 
  {
    switch(event.key) 
    {
      case "Escape" : EditEmailClickEvent = false
        break
    }
  }

  const DisabledChecklistIconInInputInformation = (event: React.KeyboardEvent<HTMLInputElement>) => 
  {
    switch(event.key) 
    {
      case "Escape" : EditInformationClickEvent = false
        break
    }
  }
  // Bagian akhir keyboard event "ESC" tombol edit

  // Function untuk mengirim data terbaru menggunakan tombol Enter
  const SendNewUserNameToApiWithEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) =>
  {
    switch(event.key) 
    {
      case "Enter" : if(SubmitNewUsernameWithEnterKeyRef.current) 
                      {
                        SubmitNewUsernameWithEnterKeyRef.current.focus()
                      }
        break
    }
  }
  // SendNewUserNameToApiWithEnterKey()

  // Function untuk menghilangkan input disable
  function SetDisplayNoneInputName()
  {
    if(DisplayNoneInputNameRef.current) 
    {
      DisplayNoneInputNameRef.current.style.display = "none"
    } 
    return null
  }

  function SetDisplayNoneInputEmail()
  {
    if(DisplayNoneInputEmailRef.current) 
    {
      DisplayNoneInputEmailRef.current.style.display = "none"
    } 
    return null
  }

  function SetDisplayNoneInputInformation()
  {
    if(DisplayNoneInputInformationRef.current) 
    {
      DisplayNoneInputInformationRef.current.style.display = "none"
    } 
    return null
  }
  // Bagian akhir function
  
  function ChangeChecklistIconInNameInput() 
  {
    if(EditNameClickEvent === true) 
    {
      SetDisplayNoneInputName()
    }
    if(EditNameClickEvent === false) 
    { 
      return <FontAwesomeIcon 
                icon={faCheck} 
                className="hidden"/>
    }
  }

  function ChangeChecklistIconInEmailInput() 
  {
    if(EditEmailClickEvent === true) 
    { 
      SetDisplayNoneInputEmail()
    }
    if(EditEmailClickEvent === false) 
    {
      return <FontAwesomeIcon 
              icon={faCheck} 
              className="hidden"/>
    }
  }

  function ChangeChecklistIconInInformationInput() 
  { 
    if(EditInformationClickEvent === true) 
    {
      AutoFocusInputInformationRef.current?.focus()
      SetDisplayNoneInputInformation()    
      return <FontAwesomeIcon 
              icon={faCheck} 
              style={{color: "#ffffff"}}
              className="cursor-pointer"/>
    }
    if(EditInformationClickEvent === false) 
    {
      return <FontAwesomeIcon 
              icon={faCheck} 
              className="hidden"/>
    }
  }

  function ClickEmojiButton(ClickEmojiButtonState: boolean) {
    SetShowEmojiComponent(ClickEmojiButtonState)
  }

  function ClickEditName(ClickEditNamestate: boolean)
  {
    setEditNameClickEvent(ClickEditNamestate)
  }

  function ClickEditEmail(ClickEditEmailState: boolean)
  {
    setEditEmailClickEvent(ClickEditEmailState)
  }

  function ClickEditInformation(ClickEditInformationState: boolean)
  {
    setEditInformationClickEvent(ClickEditInformationState)
  }

  function ShowEditIconInInputName() 
  {
    if(EditNameClickEvent === false)
    {  
      return <FontAwesomeIcon 
                icon={faEdit} 
                style={{color: "#ffffff"}}
                className="cursor-pointer z-20 bg-cyan-950 translate-y-1"
                onClick={() => ClickEditName(!EditNameClickEvent)}/>
    } 
    if(EditNameClickEvent === true)
    {  
      return <FontAwesomeIcon 
                icon={faEdit} 
                className="hidden"/>
    } 
  }

  function ShowEditIconInInputEmail() 
  {
    if(EditEmailClickEvent === false)
    {  
      return <FontAwesomeIcon 
              icon={faEdit} 
              style={{color: "#ffffff"}}
              className="cursor-pointer"
              onClick={() => ClickEditEmail(!EditEmailClickEvent)}/>
    } 
    if(EditEmailClickEvent === true)
    {  
      return <FontAwesomeIcon 
              icon={faEdit} 
              className="hidden"/>
    } 
  }

  function ShowEditIconInInputInformation() 
  {
    if(EditInformationClickEvent === false)
    {  
      return <FontAwesomeIcon 
              icon={faEdit} 
              style={{color: "#ffffff"}}
              className="cursor-pointer"
              onClick={() => ClickEditInformation(!EditInformationClickEvent)}/>
    } 
    if(EditInformationClickEvent === true)
    {  
      return <FontAwesomeIcon 
              icon={faEdit} 
              className="hidden"/>
    } 
  }

  function ShowTagInputName()
  {   
    if(EditNameClickEvent === true) 
    { 
      return <form onSubmit={handleSubmit(SubmitNewUsername)}>
                <div className="flex flex-row gap-2">
                  <input type="text" 
                         className="focus:outline-none py-1 min-w-24 pr-11 text-white bg-cyan-700 focus:border-b-4 font-serif md:font-serif"
                         value={UpdateUsername + SelectedEmoji}
                        //  value={UpdateUsername}
                         {...register("Username")}
                         onChange={(e) => SetUpdateUsername(e.target.value)}
                         onKeyDown={DisabledEditName}
                         onKeyUp={SendNewUserNameToApiWithEnterKey}
                         autoFocus={true}/>                        
                  {/* <span>{SelectedEmoji}</span> */}
                  <div className="flex flex-row gap-1 absolute left-64" style={{backgroundColor: "rgb(8 51 68)"}}>
                    <FontAwesomeIcon
                        icon={faSmile}
                        style={{color: "#ffffff"}}
                        className="cursor-pointer box-border translate-y-3 bg-red-500 w-5 h-5"
                        onClick={() => ClickEmojiButton(!ShowEmojiComponent)}
                        onKeyUp={HideEmojiPickerWithEscKey}
                        tabIndex={0}
                        aria-hidden='false'/>
                    <Button 
                      type="submit" 
                      style={{backgroundColor: "rgb(8 51 68)"}} 
                      ref={SubmitNewUsernameWithEnterKeyRef}>  
                        <FontAwesomeIcon 
                            icon={faCheck} 
                            style={{color: "#ffffff"}}
                            className="cursor-pointer box-border"/>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row">
                  {errors.Username && <span className="text-red-500">{errors.Username.message}</span>}
                </div>  
            </form>
    }
  }

  function ShowTagInputEmail()
  {   
    if(EditEmailClickEvent === false) 
    { 
      return <input type="text" 
                    name="username" 
                    className="focus:outline-none px-1 py-1 min-w-24 text-white bg-orange-600 focus:border-b-4"
                    value={session?.user?.email ?? ""}    
                    onChange={e => SetUpdateUsername(e.target.value)}/>     
    }
    if(EditEmailClickEvent === true) 
    { 
      return <input type="text" 
                    name="username" 
                    className="focus:outline-none px-1 py-1 min-w-24 text-white bg-orange-600 focus:border-b-4"
                    value={session?.user?.email ?? ""}   
                    onChange={e => SetUpdateUsername(e.target.value)}/>     
    }
  }

  function ShowTagInputInformation() 
  {
    if(EditInformationClickEvent === false) 
    {
      return <input type="text" 
              name="username" 
              className="focus:outline-none px-1 py-1 min-w-24 text-white bg-cyan-950 focus:border-b-4 border-b-cyan-700"  
              onKeyDown={DisabledEditInformation}
              onKeyUp={DisabledChecklistIconInInputInformation}
              ref={AutoFocusInputInformationRef}
              onChange={e => SetUpdateInformation(e.target.value)}/>
    }
    if(EditInformationClickEvent === true) 
    {
      return <input type="text" 
              name="username" 
              className="focus:outline-none px-1 py-1 min-w-24 text-white bg-cyan-950 focus:border-b-4 border-b-cyan-700"  
              onKeyDown={DisabledEditInformation}
              onKeyUp={DisabledChecklistIconInInputInformation}
              ref={AutoFocusInputInformationRef}
              onChange={e => SetUpdateInformation(e.target.value)}/>
    }
  }
  
  return(
    <>
      {ShowEmojiPicker()}
      <SidebarElement></SidebarElement>
      <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16  overflow-y-hidden">
        <div className="flex flex-col gap-7 mx-3 my-6">
          <div className="flex flex-col">
            <h2 className="text-white font-bold">Profie</h2>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col gap-2">
              <h4 className="text-zinc-400 font-bold">Nama</h4>
              {ShowTagInputName()}
              <div className="flex flex-row gap-2">
                <input type="text" 
                       className="focus:outline-none px-1 py-2 min-w-32 text-white bg-cyan-950 focus:border-b-4 font-serif md:font-serif"
                       value={UpdateUsername}
                       disabled
                       ref={DisplayNoneInputNameRef}
                       onChange={(e) => SetUpdateUsername(e.target.value)}/>
              </div>
            </div>  
            <div className="flex flex-row translate-y-10 translate-x-14">
              {ShowEditIconInInputName()}
              {ChangeChecklistIconInNameInput()}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col gap-2">
              <h4 className="text-zinc-400 font-bold">Email</h4>
              {ShowTagInputEmail()}
              <input type="text"
                     className="focus:outline-none px-1 py-1 -translate-y-9 min-w-24 text-white bg-red-500 focus:border-b-4 border-b-cyan-700" 
                     disabled
                     onKeyDown={DisabledEditEmail}
                     onKeyUp={DisabledChecklistIconInInputEmail}
                     defaultValue={session?.user?.email ?? ""}
                     onChange={e => SetUpdateEmail(e.target.value)}/>
            </div>
            <div className="flex flex-row translate-y-10 translate-x-10">
              {ShowEditIconInInputEmail()}
              {ChangeChecklistIconInEmailInput()}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col gap-2">
              <h4 className="text-zinc-400 font-bold">Id</h4>
              <input type="text" 
                      name=''
                      disabled
                      className="focus:outline-none px-1 py-1 min-w-24 text-white bg-cyan-950"
                      value={session?.user?.id ?? ""}
                      readOnly/>
            </div>
            <div className="flex flex-row translate-y-10 translate-x-10">
              <FontAwesomeIcon 
                icon={faClipboard} 
                style={{color: "#ffffff"}}
                className="cursor-pointer"/>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col gap-2">
              <h4 className="text-zinc-400 font-bold">Info</h4>
              {ShowTagInputInformation()}
              <input type="text" 
                     name="" 
                     className="focus:outline-none px-1 py-1 -translate-y-9 min-w-24 text-white bg-cyan-950 focus:border-b-4 border-b-cyan-700" 
                     disabled
                     onKeyDown={DisabledEditInformation}
                     onKeyUp={DisabledChecklistIconInInputInformation}
                     ref={DisplayNoneInputInformationRef}
                     onChange={e => SetUpdateInformation(e.target.value)}/>
            </div>
            <div className="flex flex-row translate-y-10 translate-x-10">
              {ShowEditIconInInputInformation()} 
              {ChangeChecklistIconInInformationInput()}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePageComponent