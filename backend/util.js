import jwt from "jsonwebtoken";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../frontend/.env") })

// .decode .sign .verify token
const getToken = (user) => {
  const { _id, username, email, isAdmin } = user;
  return jwt.sign({
    _id,
    username,
    email,
    isAdmin
  }, process.env.JWT_SECRET, {
    expiresIn: "48h"
  });
};

export { getToken }