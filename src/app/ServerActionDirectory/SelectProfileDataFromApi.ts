"use server"

export default async function GetProfileData()
{
  const ProfileData = await fetch(process.env.PROFILE_DATA_URL_BACKEND +"/api/detailsprofile")
  const GetData = await ProfileData.json() 
  return GetData
}