import { Response, Request } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { UserType } from "../types/user";

export const UserRegistration = async (req: Request, res: Response) => {
  try {
    const bodyData = req.body;
    const { name, email, password, image } = bodyData;

    if (!name || !email || !password) {
      throw new Error("Fill the form correctly");
    }

    const findExistUser = await User.findOne({
      email: email,
    });

    if (findExistUser) {
      throw new Error("User Exist! Login Now");
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
    res.status(400).send(error?.toString());
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const bodyData = req.body;
    const { email, password } = bodyData;

    const findUser: UserType | null = await User.findOne({
      email: email,
    });

    if (findUser) {
      const isPasswordValid = await findUser.matchPassword(password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { _id: findUser._id },
          process.env.JWT_SECRET as string
        );
        res.status(200).json({
          user: findUser,
          access_token: token,
        });
      } else {
        throw new Error("Wrong credentials");
      }
    }
  } catch (error) {
    res.status(400).send(error?.toString());
  }
};

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const AllUsersList = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const searchQuery = req.query.search
      ? {
          $or: [
            {
              name: { $regex: req.query.search, $options: "i" },
            },
            {
              email: { $regex: req.query.search, $options: "i" },
            },
          ],
        }
      : {};

    const searchUser = await User.find(searchQuery).find({
      _id: { $ne: req.user._id },
    });
    res.status(200).json(searchUser);
  } catch (error) {
    throw new Error("Server Problem");
  }
};
