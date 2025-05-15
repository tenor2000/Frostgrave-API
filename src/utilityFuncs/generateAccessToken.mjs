import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtExpireTime = "2h";

export default function generateAccessToken(user) {
  console.log("Generating access token for:", user);
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: jwtExpireTime,
  });
}
