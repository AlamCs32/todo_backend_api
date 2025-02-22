import { Request, Response, NextFunction } from "express"
import * as userServices from "../services/userService"
import { resSend } from "../middlewares/response/resSend"
import { JsonWebTokenError } from "jsonwebtoken"

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
        const response = await userServices.changePassword(req.userSession, req.body)
        resSend(res, 200, "Password change successfully", response)
    } catch (error) {
        next(error)
    }
}

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await userServices.forgetPassword(req.body)
        resSend(res, 200, "Email send successfully", response)
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await userServices.resetPassword(req.params.token, req.body)
        resSend(res, 200, "Password reset successfully", response)
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return resSend(res, 401, "Link has been expired.", null);
        } else if (error instanceof JsonWebTokenError) {
            return resSend(res, 401, error.message, null);
        } else {
            next(error)
        }
    }
}