import { JWTPayload, JWTVerifyResult, KeyLike, SignJWT,jwtVerify } from "jose"
import { JwtPayload } from "jsonwebtoken"
import { nanoid } from "nanoid"

const SecretToken = process.env.JWT_SECRET_KEY

export const JwtKey = new TextEncoder().encode(SecretToken) 

export async function encrypt(payload: JwtPayload)
{
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .setJti(nanoid())       
    .sign(JwtKey)
}

// export async function decrypt(input: string): Promise<JWTVerifyResult<JwtPayload>>
// {
//     const payload = await jwtVerify(input,JwtKey, 
//     {
//         algorithms: ["HS256"],
//     }) 
//     return payload 
// }

export default SecretToken