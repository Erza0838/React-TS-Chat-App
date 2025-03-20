import z from "zod"
import React from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { UserContactIdValidationSchema } from "@/lib/validations/UserInformationValidation"
import { useForm } from "react-hook-form"

export default function ErrorPage() 
{
  // Validasi zod
  type UserContactIdFormValue = z.infer<typeof UserContactIdValidationSchema>
  const AddNewContactForm = () =>
  { 
  const {register,handleSubmit,formState} = useForm<UserContactIdFormValue>(
  {
      resolver: zodResolver(UserContactIdValidationSchema),
      defaultValues: 
      {
      UserContactId: "",
      SavedUsernameContact: ""
      }
  })
  return {register,handleSubmit,formState}
  }
  const {register: AddNewContact,handleSubmit: SubmitNewContact,formState: {errors: AddNewContactErrors}} = AddNewContactForm()
}    