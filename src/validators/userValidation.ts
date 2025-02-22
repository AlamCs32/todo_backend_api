import Joi from "joi";
import { LoginPayload, SingupPayload } from "../types/userType";

export const login = Joi.object<LoginPayload>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const singup = Joi.object<SingupPayload>({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})