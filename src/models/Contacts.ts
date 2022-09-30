export interface Contact 
  {
    id?: number,
    name: string,
    phone: string,
    additionalInfo: string
  }

export interface Notifications {
  status?: string,
  message?: string
}
export interface User {
  isAuth: boolean,
  id: number,
  email: string,
  name: string,
  sirname: string,
  token: string,
  notifications: Notifications
  contacts: Contact[]
}
export interface credentials {
  email: string | undefined,
  password: string | undefined,
  name?: string | undefined,
  sirname?: string | undefined,
  method: string,
  endpoint: string
}