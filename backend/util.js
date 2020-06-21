import jwt from "jsonwebtoken";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../frontend/.env") });

// .decode .sign .verify token
const getToken = (user) => {
  
  const { _id, username, email, isAdmin } = user;
  return jwt.sign(
    {
      _id,
      username,
      email,
      isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

const isAuth = (req, res, next) => {

  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid Token." });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: "Token is not supplied." });
  }
};

const isAdmin = (req, res, next) => {

  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Invalid Admin Token." });
};

export { getToken, isAuth, isAdmin };
