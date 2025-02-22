// Environment Variables

export const HOST: string = process.env.HOST || ""
export const PORT: number = Number(process.env.PORT) || 5000
export const NODE_ENV: string = process.env.NODE_ENV || ""

export const SWAGGER_HOST: string = process.env.SWAGGER_HOST || "127.0.0.1:5500"
export const SWAGGER_BASE_PATH: string = process.env.SWAGGER_BASE_PATH || "/"

export const ACCESS_JWT_SECRET_KEY: string = process.env.ACCESS_JWT_SECRET_KEY || ""
export const ACCESS_JWT_TOKEN_EXPIRY: string = process.env.ACCESS_JWT_TOKEN_EXPIRY || "15m"

export const REFRESH_JWT_TOKEN_SECRET_KEY: string = process.env.REFRESH_JWT_TOKEN_SECRET_KEY || ""
export const REFRESH_JWT_TOKEN_EXPIRY: string = process.env.REFRESH_JWT_TOKEN_EXPIRY || "7d"

// Nodemailer Config 
export const NODEMAILER_HOST: string = process.env.NODEMAILER_HOST || ''
export const NODEMAILER_USER: string = process.env.NODEMAILER_USER || ''
export const NODEMAILER_PASS: string = process.env.NODEMAILER_PASS || ''
export const NODEMAILER_PORT: number = Number(process.env.NODEMAILER_PORT)
export const NODEMAILER_SECURE: boolean = Boolean(process.env.NODEMAILER_SECURE) || false
export const EMAIL_FROM: string = process.env.EMAIL_FROM || ""

// FRONT END
export const FE_DOMAIN: string = process.env.FE_DOMAIN