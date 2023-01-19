import { Role } from "./Common.interfaces"


export interface User {
    id: number
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    imageUrl: string,
    jobTitle: string,
    roles: Role[],
    refreshToken?: string
    accessToken?: string
}


export interface UserState {
    user: User,
    allUsers: User[],
    isAuthorized: boolean,
    selectedUser: User
}