export type Role = 'admin' | 'operations' | 'techsupport' | 'user'

export interface User {
    id: string
    name: string
    email: string,
    username: string,
    password?: string
    role: Role
}

export interface AuthState {
    isAuthenticated: boolean
    user: Omit<User, 'password'> | null
}