import { ZodError } from "zod"
import { AccountDataValidation } from "./UserInformationValidation"

export type RegisterState = 
| {
    status: "success",
    message: "string"
  }
| {
    status: "error",
    message: "string",
    errors?: Array<{
        path: string,
        message: string
    }>
  }
|
null

// export async function InsertNewAccountInformation
export async function ValidateNewAccountInformation
(
    prevState: RegisterState | null,
    data: FormData
): Promise<RegisterState> 
{   
    try 
    {
        await new Promise((resolve) => setTimeout(resolve,1000))    
        const {GenderFill,EmailFill,UsernameFill,PasswordFill} = AccountDataValidation.parse(data)
        return {
            // status: "success",
            // message: 
            status: "success",
            message: "string"
        }
    }
    catch(error)
    {
        if(error instanceof ZodError)
        {
            return {
                status: "error",
                message: "string",
                errors: error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: `Server validation: ${issue.message}`
                }))
            }
        }
        return {
            status: "error",
            message: "string"
        }
    }
    return prevState
}
