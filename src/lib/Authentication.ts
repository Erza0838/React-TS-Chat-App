import { cookies } from "next/headers"
import { jwtVerify,SignJWT, UnsecuredJWT } from "jose"
import { JWTVerifyResult } from "jose"
import { JwtPayload } from "jsonwebtoken"

const SecretToken = process.env.JWT_SECRET_KEY

interface UserJwtPayload
{
    jti: string,
    iat: number
}

export const getJwtSecretKey = () => 
{
    const SecretToken = process.env.JWT_SECRET_KEY
    if(!SecretToken || SecretToken.length === 0)
    {
        throw new Error("ENV belum diatur")
    }
    return SecretToken
}

export const verifyAuth = async (token:string) => 
{
    try 
    {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))    
        return verified.payload as UserJwtPayload
    }
    catch (error)
    {
        throw new Error("Token sudah hangus")       
    }
}

// const JwtKey = new TextEncoder().encode(SecretToken) 
// export async function encrypt(payload: JwtPayload)
// {
//     return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("2h")
//     .sign(JwtKey)
// }

// export async function decrypt(input: string): Promise<JWTVerifyResult<JwtPayload>>
// {
//     const payload = await jwtVerify(input,JwtKey, 
//     {
//         algorithms: ["HS256"],
//     }) 
//     return payload 
// }