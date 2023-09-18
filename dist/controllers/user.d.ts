import { Response, Request } from "express";
export declare const UserRegistration: (req: Request, res: Response) => Promise<void>;
export declare const LoginUser: (req: Request, res: Response) => Promise<void>;
interface AuthenticatedRequest extends Request {
    user?: any;
}
export declare const AllUsersList: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export {};
