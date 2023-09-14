//db connection
import mongoose from "mongoose";

const DbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error: any) => {
      throw new Error(error.toString());
    });
};
module.exports = DbConnect;
