import { INVALID, z } from "zod"

export const NewAccountDataValidationSchema = z.object(
{
    GenderFill: z.string().trim().min(8, 
                {
                    message: "Gender minimal 9 karakter"
                }).max(9,
                {
                    message: "Gender maksimal 9 karakter"
                }),
    EmailFill: z.string().trim().min(4, 
                {
                    message: "Email minimal 4 karakter"
                }),
    UsernameFill: z.string().trim().min(4, 
                {
                    message: "Username minimal 4 karakter"
                }).max(30,
                {
                    message: "Username maksimal 30 karakter"
                }),
    PasswordFill: z.string().trim().min(4, 
                {
                    message: "Password minimal 4 karakter"
                }).max(30,
                {      
                    message: "Password maksimal 30 karakter"
                }),
})    

export const LoginDataValidationSchema = z.object(
{
    ValidateEmailFill: z.string
    ({
        invalid_type_error: "Email tidak terdaftar"   
    }).trim().min(4, 
    {
        message: "Email minimal 4 karakter"
    }),
})