export type RegisterState = 
| {
    status: "success",
    message: "string"
  }
| null

export async function InsertNewAccountInformation(
    prevState: RegisterState | null,
    data: FormData
): Promise<RegisterState>