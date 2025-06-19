import jwt from "jsonwebtoken";

export const generateToken = (name: string, email: string) => {
  const token = jwt.sign({ name, email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};