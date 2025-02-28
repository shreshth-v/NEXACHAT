import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new CustomError(400, "Token not found");

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    asyncWrapper(async (err, payload) => {
      if (err) throw new CustomError(400, "Unauthorized user");

      const user = await User.findOne({ _id: payload._id }).select("-password");
      req.user = user;

      return next();
    })
  );
};

export default verifyToken;
