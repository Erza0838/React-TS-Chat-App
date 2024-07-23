import { z } from "zod"

const AccountDataValidation = z.object(
{
    GenderFill: z.string(
                {
                    required_error: "Gender tidak boleh kosong"
                })
                .min(4, "Gender minimal 4 karakter")
                .max(8, {message:"Gender maksimal 8 karakter" }),
    EmailFill: z.string(
                {
                    required_error: "Email tidak boleh kosong!"
                }).min(4, {message: "Panjang Email minimal 4 karakter"}),
    UsernameFill: z.string(
                {
                    required_error: "Username tidak boleh kosong!"
                }).min(2, {message: "Panjang Username minimal 2 karakter"}),
    PasswordFill: z.string(
                {
                    required_error: "Password tidak boleh kosong!"
                }).min(6, {message: "Panjang Password minimal 6 karakter"}),
})

export type ValidateRegisterData  = z.infer<typeof AccountDataValidation> 