import mongoose from "mongoose";
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    image: string;
    email: string;
    password: string;
    isAdmin: boolean;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    image: string;
    email: string;
    password: string;
    isAdmin: boolean;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    image: string;
    email: string;
    password: string;
    isAdmin: boolean;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    image: string;
    email: string;
    password: string;
    isAdmin: boolean;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    image: string;
    email: string;
    password: string;
    isAdmin: boolean;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    image: string;
    email: string;
    password: string;
    isAdmin: boolean;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default User;
