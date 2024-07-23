import { getEnvVariable } from "./Helper"
import { KeyLike } from "crypto"
import { JWTPayload, JWTVerifyOptions, JWTVerifyResult, SignJWT,jwtVerify } from "jose"
import jose from "jose"
import * as crypto from "crypto"

// export const signJWT = async(payload: {sub: string},options: {exp: string}) => 
// {
//     try 
//     {
//         const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET_KEY"))
//         const alg = "HS256"
//         return new SignJWT(payload)
//                .setProtectedHeader({ alg })
//                .setExpirationTime(options.exp)
//                .setIssuedAt()
//                .setSubject(payload.sub)
//                .sign(secret)  
//     } 
//     catch (error)
//     {
//         throw error
//     }
// }

// export const verifyJWT = async <T>(token: string): Promise<T> => 
// {
//     try 
//     {
//         return (
//             await jwtVerify(
//                 token,
//                 new TextEncoder().encode(process.env.JWT_SECRET_KEY)
//             )    
//         ).payload as T
//     }
//     catch (error)
//     {
//         console.log(error)        
//         throw new Error("Token kadaluarsa")
//     }
// }

// Eksperimen sign in token
export default async function SignJWTFc(payload: JWTPayload) 
{   
    try 
    {
        // const secret = new TextEncoder().encode("JWT_SECRET_KEY")
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
        const alg: string = "HS256"
        const jwt = await new jose.SignJWT({ "urn:example:claim": true })
                    .setProtectedHeader({ alg })
                    .setIssuedAt()
                    .setIssuer("urn:example:issuer")
                    .setAudience("urn:example:audience")
                    .setExpirationTime("2h")
                    .sign(secret)
        console.log(jwt)
        return jwt 
    }
    catch (error)
    {
        console.log(error)
    }    
}