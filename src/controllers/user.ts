import { Response, Request } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { UserType } from "../types/user";

const UserRegistration = async (req: Request, res: Response) => {
  try {
    const bodyData = req.body;
    const { name, email, password, image } = bodyData;

    if (!name || !email || !password) {
      res.status(400).send("Fill the form correctly");
    }

    const findExistUser = await User.findOne({
      email: email,
    });

    if (findExistUser) {
      res.status(400).send("User Exist! Login Now");
    }

    const saveNewUser: UserType = await User.create({
      name,
      email,
      password,
      image,
    });

    if (saveNewUser) {
      const token = jwt.sign(
        { _id: saveNewUser._id },
        process.env.JWT_SECRET as string
      );
      res.status(201).json({
        user: saveNewUser,
        access_token: token,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export default UserRegistration;
