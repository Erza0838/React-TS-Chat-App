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
import { UpdateUsernameValidationSchema } from '@/lib/validations/UserInformationValidation'
import { UpdateEmailValidationSchema } from '@/lib/validations/UserInformationValidation'
import { reloadSession } from '@/lib/ReloadSession'

// Bagian untuk import Array emoji wajah
import { FirstColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { SecondColumEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { ThirdColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { FourthColumEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { FifthColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { SixthColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { SeventhColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { EigthColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { NinthColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { TenthColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { EleventhColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'
import { TwelfthColumnEmojiSmileys } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'

// Bagian untuk import Array emoji tangan
import { FirstColumnHandEmoji } from '@/Helper/ProfilePage/EmojiCollection/HandEmojiList'
import { SecondColumnHandEmoji } from '@/Helper/ProfilePage/EmojiCollection/HandEmojiList'
import { ThirdColumnHandEmoji } from '@/Helper/ProfilePage/EmojiCollection/HandEmojiList'
import { FourthColumnHandEmoji } from '@/Helper/ProfilePage/EmojiCollection/HandEmojiList'
import { FifthColumnHandEmoji } from '@/Helper/ProfilePage/EmojiCollection/HandEmojiList'

// Bagian untuk import Array emoji hewan
import { FirstColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { SecondColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { ThirdColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { FourthColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { FifthColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { SixthColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { SeventhColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { EigthColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { NinthColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { TenthColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { EleventhColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { TwlefthColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { ThirteenthColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'
import { FourteenthColumnAnimalEmoji } from '@/Helper/ProfilePage/EmojiCollection/AnimalEmoji'

const ProfilePageComponent = () =>
{ 
  const {data: session, update} = useSession()

  console.log("Kadaluarsa cookie : " + session?.expires)

  // useRef untuk input tag
  const AutoFocusInputNameRef = useRef<HTMLInputElement>(null)
  const DisplayNoneInputNameRef = useRef<HTMLInputElement>(null)
  const AutoFocusInputEmailRef = useRef<HTMLInputElement>(null)
  const DisplayNoneInputEmailRef = useRef<HTMLInputElement>(null)
  const AutoFocusInputInformationRef = useRef<HTMLInputElement>(null)
  const DisplayNoneInputInformationRef = useRef<HTMLInputElement>(null)

  // useRef untuk update button
  const SubmitNewUsernameWithEnterKeyRef = useRef<HTMLButtonElement>(null)
  const SubmitNewEmailWithEnterKeyRef = useRef<HTMLButtonElement>(null)

  // State untuk tombol emoji
  const [ShowEmojiComponent,SetShowEmojiComponent] = useState<boolean>(false)

  // useRef untuk tombol emoji
  const HideEmojiPickerRef = useRef<HTMLDivElement>(null)

  // State untuk tag input update profile
  const [UpdateUsername,SetUpdateUsername] = useState<string>("")
  const [UpdateEmail,SetUpdateEmail] = useState<string>("")
  const [UpdatInformation,SetUpdateInformation] = useState<string>("")
  let [SelectedEmoji,SetSelectedEmoji] = useState<string>("")

  // State untuk mouse event
  let [EditNameClickEvent,setEditNameClickEvent] = useState<boolean>(false)
  let [EditEmailClickEvent,setEditEmailClickEvent] = useState<boolean>(false)
  let [EditInformationClickEvent,setEditInformationClickEvent] = useState<boolean>(false)
  const [ChecklistIconInNameInput,setChecklistIconInNameInput] = useState<boolean>(false)
  // Validasi zod username
  type UpdateUsernameFormValues = z.infer<typeof UpdateUsernameValidationSchema>
  type UpdateEmailFormValues = z.infer<typeof UpdateEmailValidationSchema>

  console.log("Session data : " + JSON.stringify(session))
  // if(!session)
  // {
  //   redirect("/login")
  // }

  // UseEffect untuk menyimpan nilai pada state variable saat ada perubahan pada session
  useEffect(() => 
  {
    if(session && session.user.name) 
    {
      SetUpdateUsername(session.user.name)
    }
    if(session && session.user.email) 
    {
      SetUpdateEmail(session.user.email)
    }

    // if(!session?.expires) 
    // {
    //   session.update()
    // }
  },[session])
  // Baris akhir useEffect

  // if(session) 
  // {
  //   console.log(session.user.name)
  // }
  // if(session == undefined || !session) 
  // {
  //   redirect("/login")
  // }

  const UpdateEmailProfileForm = () => 
  {
    const {register,handleSubmit,formState} = useForm<UpdateEmailFormValues>
    ({
      resolver: zodResolver(UpdateEmailValidationSchema)
    })
    return { register,handleSubmit,formState }
  }
  const {register: registerEmail,handleSubmit: handleEmailSubmit,formState: {errors: emailErrors}} = UpdateEmailProfileForm()

  const UpdateUsernameProfileForm = () => 
  {
    const { register, handleSubmit, formState } = useForm<UpdateUsernameFormValues>
    ({
      resolver: zodResolver(UpdateUsernameValidationSchema)
    })
    return { register, handleSubmit, formState } 
  }
  const {register: register,handleSubmit: handleSubmit,formState: {errors: errors}} = UpdateUsernameProfileForm()
    
  const SubmitNewUsername:SubmitHandler<UpdateUsernameFormValues>  = async (data: UpdateUsernameFormValues) => 
  {
    console.log("Submitted username: ",data)
    try 
    {                                              
      const response = await fetch("/api/profileapi/updateusernameprofile",
      {
        method: "PUT",
        headers: 
        {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
      }) 
      if(!response.ok) 
      {
          throw new Error("Network response error")
      }
      const result = await response.json()
      console.log(result)
      if(result.error) 
      {
        toast.error(result.error)
        return
      }
      if(session && session.user) 
      {
        update({
          ...session,
          user: 
          {
            ...session?.user,
            name: data.Username,
          }
        })
        SetUpdateUsername(data.Username)
        reloadSession() 
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
  // Baris akhir validasi zod email
  const SubmitNewEmail:SubmitHandler<UpdateEmailFormValues>  = async (data: UpdateEmailFormValues) => 
  {
    console.log("Submitted email: ",data)
    try 
    {                                              
      const response = await fetch("/api/profileapi/updateemailprofile",
      {
        method: "PUT",
        headers: 
        {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
      }) 
      if(!response.ok) 
      {
          throw new Error("Network response error")
      }
      const result = await response.json()
      console.log(result)
      if(result.error) 
      {
        toast.error(result.error)
        return
      }
      if(session && session.user) 
      {
        update({
          ...session,
          user: 
          {
            ...session?.user,
            email: data.Email,
          }
        })
        SetUpdateEmail(data.Email)
        reloadSession() 
      }
    } 
    catch(error) 
    {
      console.error("Error submit form : " + error)
    }
    finally
    {
      toast.success("Email diubah!")
    }
  }
  // Baris akhir validasi zod email

  // Bagian function untuk emoji
  // Function untuk menghilangkan emoji picker
  function HideEmojiPickerWithEscKey(event: React.KeyboardEvent<SVGSVGElement>) 
  {
    switch(event.key) 
    { 
      case "Escape" : 
      {
          if(HideEmojiPickerRef.current) 
          {
            HideEmojiPickerRef.current.style.display = "none"
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
      return <div className="flex flex-col absolute translate-x-96 w-72 h-36 pt-4 pb-4 top-8 z-10 bg-cyan-700 overflow-y-auto" ref={HideEmojiPickerRef}>
              <div className="flex flex-row justify-center gap-3">          
                {FirstColumnEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {SecondColumEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {ThirdColumnEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {FourthColumEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {FifthColumnEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {SixthColumnEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {SeventhColumnEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {EigthColumnEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {NinthColumnEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {TenthColumnEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {EleventhColumnEmojiSmileys.unicode.map((emoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: emoji }} className="cursor-pointer" onClick={() => ChoseEmoji(emoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-4">        
                {FirstColumnHandEmoji.unicode.map((HandEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: HandEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(HandEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-4">        
                {SecondColumnHandEmoji.unicode.map((HandEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: HandEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(HandEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-4">        
                {ThirdColumnHandEmoji.unicode.map((HandEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: HandEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(HandEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {FourthColumnHandEmoji.unicode.map((HandEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: HandEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(HandEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {FifthColumnHandEmoji.unicode.map((HandEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: HandEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(HandEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {FirstColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {SecondColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {ThirdColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {FourthColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {FifthColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {SixthColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {SeventhColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {EigthColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {NinthColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {TenthColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {EleventhColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {TwlefthColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {ThirteenthColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
              <div className="flex flex-row justify-center gap-3">        
                {FourteenthColumnAnimalEmoji.unicode.map((AnimalEmoji,index) => 
                  ( 
                      <span key={index} dangerouslySetInnerHTML={{ __html: AnimalEmoji }} className="cursor-pointer" onClick={() => ChoseEmoji(AnimalEmoji)} />
                  ))
                }
              </div>
             </div>
    }
  }
  // Baris akhir function emoji
  
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
                      if(DisplayNoneInputEmailRef.current) 
                      {
                          DisplayNoneInputEmailRef.current.style.display = "block"
                      }
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

  const SendNewEmailToApiWithEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) =>
  {
    switch(event.key) 
    {
      case "Enter" : if(SubmitNewEmailWithEnterKeyRef.current) 
                      {
                        SubmitNewEmailWithEnterKeyRef.current.focus()
                      }
        break
    }
  }

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
                         className="focus:outline-none py-1 min-w-24 pr-11 text-white bg-cyan-950 focus:border-b-4 font-serif md:font-serif"
                         value={UpdateUsername + SelectedEmoji}
                         {...register("Username")}
                         onChange={(e) => 
                         {
                          SetUpdateUsername(e.target.value)
                         }}
                         onKeyDown={DisabledEditName}
                         onKeyUp={SendNewUserNameToApiWithEnterKey}
                         autoFocus={true}/>                        
                  <div className="flex flex-row gap-0 absolute left-64" style={{backgroundColor: "rgb(8 51 68)"}}>
                    <FontAwesomeIcon
                        icon={faSmile}
                        style={{color: "#ffffff"}}
                        className="cursor-pointer box-border translate-y-3 outline-none active:bg-cyan-700 pr-1 pl-1 pt-1 pb-1 rounded-full"
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
    if(EditEmailClickEvent === true) 
    { 
      return <form onSubmit={handleEmailSubmit(SubmitNewEmail)}>
                <div className="flex flex-row gap-2">
                  <input type="text" 
                         className="focus:outline-none py-1 min-w-24 pr-11 text-white bg-cyan-950 focus:border-b-4 font-serif md:font-serif"
                         value={UpdateEmail}
                        //  value={session?.user.email ?? ""}
                         {...registerEmail("Email")}
                         onChange={(event) => 
                         {
                          SetUpdateEmail(event.target.value)
                         }}
                         onKeyDown={DisabledEditEmail}
                         onKeyUp={SendNewEmailToApiWithEnterKey}
                         autoFocus={true}/>                        
                  <div className="flex flex-row gap-0 absolute left-64" style={{backgroundColor: "rgb(8 51 68)"}}>
                    <Button 
                      type="submit" 
                      style={{backgroundColor: "rgb(8 51 68)"}} 
                      ref={SubmitNewEmailWithEnterKeyRef}>  
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
      {/* {session ? 
      ( 
        <> */}
          {ShowEmojiPicker()}
          <SidebarElement></SidebarElement>
          <div className="inline-block bg-cyan-950 h-lvh w-80 overflow-auto touch-pan-x absolute left-16  overflow-y-hidden">
            <div className="flex flex-col gap-7 mx-3 my`x-6">
              <div className="flex flex-col">
                <h2 className="text-white font-bold">Profie</h2>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col gap-2">
                  <h4 className="text-zinc-400 font-bold">Nama</h4>
                  {ShowTagInputName()}
                  <div className="flex flex-row gap-2">
                    <input className="focus:outline-none px-1 py-2 min-w-32 text-white bg-cyan-950 focus:border-b-4 font-serif md:font-serif"
                          value={UpdateUsername + SelectedEmoji}
                          // value={session?.user.name + SelectedEmoji}
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
                  <input className="focus:outline-none px-1 py-1 min-w-24 text-white bg-cyan-950 focus:border-b-4 border-b-cyan-700" 
                         value={UpdateEmail}
                        //  value={session?.user.email!}
                         disabled
                         ref={DisplayNoneInputEmailRef}
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
    //   ) : 
    //   (
    //     redirect("/login")
    //   )}
    // </>
  )
}

export default ProfilePageComponent