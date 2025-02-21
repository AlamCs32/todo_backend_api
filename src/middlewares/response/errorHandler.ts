import { NextFunction, Request, Response } from "express";
import { resSend } from "./resSend";

const errorHandler = (error: any, _req: Request, res: Response, next: NextFunction): void => {
    if (!error) {
        return next();
    }
    resSend(res, 406, error.message, null);
};

export default errorHandler;
