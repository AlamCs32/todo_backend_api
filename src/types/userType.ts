export interface LoginPayload {
    email: string
    password: string
}

export interface SingupPayload extends LoginPayload {
    username: string
}

export interface ChangePasswordPayload {
    oldPassword: string
    password: string
    confirmPassword: string
}

export interface ForgetPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    password: string;
    confirmPassword: string;
}