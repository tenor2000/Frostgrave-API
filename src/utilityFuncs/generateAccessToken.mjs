import jwt from "jsonwebtoken";

const jwtExpireTime = "2h";

export default function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: jwtExpireTime,
  });
}
