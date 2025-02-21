import { Request, Response, NextFunction } from "express";
import { resSend } from "../response/resSend";
import { ObjectSchema } from "joi";

const options = {
    errors: {
        wrap: {
            label: "",
        },
    },
};

const reqValidator = (validator: ObjectSchema) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            if (req.method === "GET" || req.method === "DELETE") {
                req.query = await validator.validateAsync(req.query, options);
            } else if (["POST", "PUT", "PATCH"].includes(req.method)) {
                req.body = await validator.validateAsync(req.body, options);
            }
            next();
        } catch (error: any) {
            resSend(res, 406, error.message, null);
        }
    };
};

export default reqValidator;
