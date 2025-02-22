import prisma from "../config/prisma"
import { LoginPayload, SingupPayload } from "../types/userType"
import * as jwtServices from "../utils/jwt"
import * as bcryptServices from "../utils/bcrypt"

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

export const changePassword = async () => { }

export const forgetPassword = async () => { }

export const resetPassword = async () => { }