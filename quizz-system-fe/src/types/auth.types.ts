export interface ISignInRequest {
    username: string,
    password: string
}

export interface ISignUpRequest {
    firstName: string,
    lastName: string,
    username: string,
    password: string
}

export interface ISignInResult {
    accessToken: string
}