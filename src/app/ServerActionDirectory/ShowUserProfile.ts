"use server"
import { prisma } from "../Database"

export default async function UserProfile()
{
    try 
    {
        const GetProfileData = await prisma.userModel.findMany
        ({
            select:
            {
                Email: true,
                Username: true,
                Genders: true,
                id: true
            }
        })      
        return GetProfileData
    } 
    catch(error) 
    {
        throw new Error("Select data failed")
    }
}   