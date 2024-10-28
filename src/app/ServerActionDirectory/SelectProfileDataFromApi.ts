export default async function GetProfileData()
{
  const ProfileData = await fetch("http://localhost:3000/api/getuserprofile/")
  const GetData = await ProfileData.json() 
  return GetData
}