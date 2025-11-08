import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No access token found",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    (req as any).user = decoded; // attach user info to request for downstream use

    next(); // ✅ Continue to the controller
  } catch (err: any) {
    console.error("verifyToken middleware error:", err.message);

    return res.status(403).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};
