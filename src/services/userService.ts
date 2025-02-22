import prisma from "../config/prisma"
import { ChangePasswordPayload, ForgetPasswordPayload, LoginPayload, ResetPasswordPayload, SingupPayload } from "../types/userType"
import * as jwtServices from "../utils/jwt"
import * as bcryptServices from "../utils/bcrypt"
import { UserSessionData } from "../express"
import { FE_DOMAIN, NODE_ENV } from "../utils/constants"
import { resetPasswordTemplate } from "../templates"
import { sendEmail } from "../utils/nodemailer"

export const singup = async (body: SingupPayload) => {
    let { username, email, password } = body

    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (user) {
        throw new Error(`User is present pls login`)
    }

    // Hash Password
    password = await bcryptServices.hashPassword(password)

    const newUser = await prisma.user.create({
        data: { username, email, password }
    })

    const tokenPayload = {
        userId: newUser.userId, role: newUser.role
    }
    const accessToken = jwtServices.generateAccessToken(tokenPayload)
    const refreshToken = jwtServices.generateRefreshToken(tokenPayload)

    const { password: userPassword, ...restUser } = newUser
    return { accessToken, refreshToken, user: restUser }
}

export const login = async (body: LoginPayload) => {
    const { email, password } = body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new Error(`User not found`)
    }

    const matchPassword = await bcryptServices.comparePassword(password, user.password)
    if (!matchPassword) throw new Error("Email or passsword is incorrect")

    const tokenPayload = {
        userId: user.userId, role: user.role
    }
    const accessToken = jwtServices.generateAccessToken(tokenPayload)
    const refreshToken = jwtServices.generateRefreshToken(tokenPayload)

    const { password: userPassword, ...restUser } = user
    return { accessToken, refreshToken, user: restUser }
}

export const changePassword = async (userSession: UserSessionData, body: ChangePasswordPayload) => {
    const { userId } = userSession
    let { oldPassword, password, confirmPassword } = body

    const user = await prisma.user.findUnique({
        where: {
            userId
        }
    })
    if (!user) throw new Error(`User not found`)

    const matchPassword = await bcryptServices.comparePassword(oldPassword, user.password)
    if (!matchPassword) throw new Error('Incorrect password')

    if (password !== confirmPassword) {
        throw new Error(`Password and confirm password not match`)
    }
    // Hash Password
    password = await bcryptServices.hashPassword(password)

    await prisma.user.update({
        where: { userId },
        data: { password }
    })

    return { userId }
}

export const forgetPassword = async (body: ForgetPasswordPayload) => {
    const { email } = body

    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (user) throw new Error(`User is not present`)

    const domain = FE_DOMAIN

    const token = jwtServices.generateAccessToken({ userId: user.userId, role: user.role }, "5m")

    const resetPasswordLink = `${domain}/reset-password/${token}`

    let html = resetPasswordTemplate;
    html = html.replace("{username}", user.username)
    html = html.replace("{resetLink}", resetPasswordLink)
    html = html.replace("{expire}", "5 minutes")

    console.log({ resetPasswordLink })
    // Send Email
    if (NODE_ENV === "prod") {
        await sendEmail({
            subject: `Password Reset Request for ${user.username}`,
            to: user.email,
            html
        })
    }

    return
}

export const resetPassword = async (token: string, body: ResetPasswordPayload) => {
    let { confirmPassword, password } = body

    const { userId } = jwtServices.validateAccessToken(token)

    const user = await prisma.user.findUnique({
        where: { userId }
    })
    if (user) throw new Error(`User is not present`)

    if (password !== confirmPassword) {
        throw new Error(`Password and confirm password not match`)
    }

    // Hash Password
    password = await bcryptServices.hashPassword(password)

    await prisma.user.update({
        where: { userId },
        data: { password }
    })

    return
}