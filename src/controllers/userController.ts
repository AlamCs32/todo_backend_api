import { Request, Response, NextFunction } from "express"
import * as userServices from "../services/userService"
import * as JwtService from "../utils/jwt"
import { resSend } from "../middlewares/response/resSend"

export const singup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await userServices.singup(req.body)
        resSend(res, 200, "Singup successfully", response)
    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await userServices.login(req.body)
        resSend(res, 200, "Login successfully", response)
    } catch (error) {
        next(error)
    }
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        resSend(res, 200, "Password change successfully")
    } catch (error) {
        next(error)
    }
}

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        resSend(res, 200, "Login successfully")
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        resSend(res, 200, "Login successfully")
    } catch (error) {
        next(error)
    }
}