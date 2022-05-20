

export interface SignupResponsePayload {
    id: string,
    email: string,
    phone: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: number,
    status: number,
    fullName: string,
    login: string
}