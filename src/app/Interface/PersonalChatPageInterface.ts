export interface PersonalContactProperty 
{
  PersonalContactList: PersonalContact[]
}

interface PersonalContact
{
  ContactId: string
  SavedContactName?: string
  Contact_Id: string
}

export interface ContactInterface 
{   
    ContactId: string
    SavedContactName: string
}

export interface ContactListProops 
{
    contacts: ContactInterface[]
}