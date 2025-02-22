import { Request, Response, NextFunction } from "express";
import { resSend } from "../response/resSend.js";
import * as JwtService from "../../utils/jwt.js";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Skip if module is common
    const urlParts = req.url.split("/");
    const moduleNameFromUrl = urlParts[1]; // Assuming the first part of the URL is the module name

    if (moduleNameFromUrl === "common") return next();

    // Extract token and validate.
    const { headers } = req;
    const authorizationHeader = headers["authorization"];

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Bearer token missing or invalid");
    }

    const token = authorizationHeader.split(" ")[1];

    const decodedToken: any = JwtService.validateAccessToken(token);

    req.userSession = decodedToken;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      resSend(res, 401, "Session expired. Please log in again.", null);
    } else {
      // Handle other types of errors
      resSend(res, 401, error.message, null);
    }
  }
};


