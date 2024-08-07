import { getEnvVariable } from "./Helper"
import { KeyLike } from "crypto"
import { JWTPayload, JWTVerifyOptions, JWTVerifyResult, SignJWT,jwtVerify } from "jose"
import jose from "jose"

// Eksperimen sign in token
export default async function SignJWTFc(payload: JWTPayload) 
{   
    try 
    {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
        const alg: string = "HS256"
        const jwt = await new jose.SignJWT({ "urn:example:claim": true })
                    .setProtectedHeader({ alg })
                    .setIssuedAt()
                    .setIssuer("urn:example:issuer")
                    .setAudience("urn:example:audience")
                    .setExpirationTime("2h")
                    .sign(secret)
        return jwt 
    }
    catch (error)
    {
        console.log(error)
    }    
}