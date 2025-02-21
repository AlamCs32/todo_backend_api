import { Request, Response, NextFunction } from "express";

export function forwardedPrefixMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  (req as any).originalUrl =
    (req.headers["x-forwarded-prefix"] || "") + req.url;
  next();
}
