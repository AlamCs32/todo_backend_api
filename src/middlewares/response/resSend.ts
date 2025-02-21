import { Response } from "express";
import message from "./msgs";

export const resSend = (res: Response, code: number, msg: string, data: any = {}): void => {
    try {
        const result: any = {};
        const n_code: number = code ? code : 455;
        const m = message[n_code];
        result.success = m ? m.status : n_code;
        result.message = msg ? msg : m.message;
        result.data = data;
        res.status(m ? m.httpCode : 280).send(result);
    } catch (error: unknown) {
        res.status(406).send({
            success: false,
            message: "Failure while encrypting data: " + (error as Error).message,
        });
    }
};
