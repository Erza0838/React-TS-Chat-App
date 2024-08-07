import { NextResponse } from "next/server"
import { ZodError } from "zod"

type EnvVariableKey = "JWT_SECRET_KEY" | "JWT_KEY_EXPIRES" 

export function getEnvVariable(key: EnvVariableKey): string
{
    const value = process.env[key]
    if(!value || value.length === 0)
    {
        console.error(`Environment variable ${key} belum di atur`)
        throw new Error(`Environment variable ${key} belum di atur`)
    }
    return value
}

export function getErrorResponse(status: number = 500,message: string,errors: ZodError)
{
    return new NextResponse(
        JSON.stringify({
            status: status < 500 ? "fail" : "error",
            message,
            errors: errors ? errors.flatten() : null
        }),
        {
            status,
            headers: 
            {"Content-Type": "application/json"}
        }
    )
}
