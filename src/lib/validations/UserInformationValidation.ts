import { z } from "zod"

export const NewAccountDataValidationSchema = z.object(
{
    Genders: z.string().trim().min(8, 
                {
                    message: "Gender minimal 9 karakter"
                }).max(9,
                {
                    message: "Gender maksimal 9 karakter"
                }),
    Email: z.string().trim().min(4, 
                {
                    message: "Email minimal 4 karakter"
                }),
    Username: z.string().trim().min(4, 
                {
                    message: "Username minimal 4 karakter"
                }).max(30,
                {
                    message: "Username maksimal 30 karakter"
                }),
    Password: z.string().trim().min(4, 
                {
                    message: "Password minimal 4 karakter"
                }).max(30,
                {      
                    message: "Password maksimal 30 karakter"
                }),
})    

export const LoginDataValidationSchema = z.object(
{
    email: z.string().trim().min(4, 
    {
        message: "Email minimal 4 karakter"
    }),
    password: z.string().trim().min(4, 
    {
        message: "Password minimal 4 karakter"
    }).max(30,
    {      
        message: "Password maksimal 30 karakter"
    })
})

export const UpdateUsernameValidationSchema = z.object(
{
    username: z.string().trim().min(1, 
    {
        message: "username tidak boleh kosong"
    }).max(20,{
        message: "username maksimal 20 karakter"
    })
})