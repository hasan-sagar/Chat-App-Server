import mongoose from "mongoose";
declare const Message: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    content?: string;
    sender?: mongoose.Types.ObjectId;
    chat?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    content?: string;
    sender?: mongoose.Types.ObjectId;
    chat?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    content?: string;
    sender?: mongoose.Types.ObjectId;
    chat?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    content?: string;
    sender?: mongoose.Types.ObjectId;
    chat?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    content?: string;
    sender?: mongoose.Types.ObjectId;
    chat?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    content?: string;
    sender?: mongoose.Types.ObjectId;
    chat?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default Message;
