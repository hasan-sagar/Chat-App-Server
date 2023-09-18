import { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
    user?: any;
}
export declare const VerifyToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
