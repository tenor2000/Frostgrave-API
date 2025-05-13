import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    console.log("User authenticated:", user.username);
    req.user = user;
    next();
  });
}
