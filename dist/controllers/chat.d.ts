import { Request, Response } from "express";
export declare const ChatAccess: (req: Request | any, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const FetchChat: (req: Request | any, res: Response) => Promise<void>;
export declare const GroupChatCreate: (req: Request | any, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GroupChatNameUpdate: (req: Request, res: Response) => Promise<void>;
export declare const UserAddToGroup: (req: Request, res: Response) => Promise<void>;
export declare const UserRemoveFromGroup: (req: Request, res: Response) => Promise<void>;
