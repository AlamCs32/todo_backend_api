import Joi from "joi";
import { ChangePasswordPayload, ForgetPasswordPayload, LoginPayload, ResetPasswordPayload, SingupPayload } from "../types/userType";

export const login = Joi.object<LoginPayload>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const singup = Joi.object<SingupPayload>({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const changePassword = Joi.object<ChangePasswordPayload>({
    oldPassword: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
})

export const forgetPassword = Joi.object<ForgetPasswordPayload>({
    email: Joi.string().email().required(),
})

export const resetPassword = Joi.object<ResetPasswordPayload>({
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
})