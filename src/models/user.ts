import mongoose, { Schema, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    },
  },
  { timestamps: true }
);

type user = InferSchemaType<typeof UserSchema>;
const User = mongoose.model("User", UserSchema);

module.exports = User;
