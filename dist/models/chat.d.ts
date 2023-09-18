import mongoose from "mongoose";
export declare const Chat: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isGroupChat: boolean;
    users: mongoose.Types.ObjectId[];
    chatName?: string;
    latestMessage?: mongoose.Types.ObjectId;
    groupAdmin?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isGroupChat: boolean;
    users: mongoose.Types.ObjectId[];
    chatName?: string;
    latestMessage?: mongoose.Types.ObjectId;
    groupAdmin?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isGroupChat: boolean;
    users: mongoose.Types.ObjectId[];
    chatName?: string;
    latestMessage?: mongoose.Types.ObjectId;
    groupAdmin?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isGroupChat: boolean;
    users: mongoose.Types.ObjectId[];
    chatName?: string;
    latestMessage?: mongoose.Types.ObjectId;
    groupAdmin?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isGroupChat: boolean;
    users: mongoose.Types.ObjectId[];
    chatName?: string;
    latestMessage?: mongoose.Types.ObjectId;
    groupAdmin?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isGroupChat: boolean;
    users: mongoose.Types.ObjectId[];
    chatName?: string;
    latestMessage?: mongoose.Types.ObjectId;
    groupAdmin?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default Chat;
