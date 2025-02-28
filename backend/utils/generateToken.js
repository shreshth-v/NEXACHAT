import jwt from "jsonwebtoken";

const generateToken = (_id) => {
  const options = {
    expiresIn: "7d",
  };

  const token = jwt.sign({ _id }, process.env.JWT_SECRET, options);

  return token;
};

export default generateToken;
