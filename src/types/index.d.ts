export interface NewUserPayload {
  name: string,
  email: string,
  password: string
}

export interface NewUserData {
  name: string,
  id: string
}

export interface UserCreationResult {
  code: number,
  success: boolean,
  message: string,
  data?: NewUserData,
  token?: string
}
