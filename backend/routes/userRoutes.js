import express from "express";
import User from "../models/user";
import { getToken } from "../util";
// import bcrypt from "bcrypt";

const userRouter = express.Router();

// signin - address is still /api/users/signin
userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const signinUser = await User.findOne({ email, password });
    if (signinUser) {
      const { id, username, email, isAdmin } = signinUser;
      const token = getToken(signinUser);
      res.send({
        _id: id,
        username,
        email,
        isAdmin,
        token,
      });
    } else {
      res.status(401).send({ msg: "Invalid email or password." });
    }
  } catch (error) {
    res.send({ msg: "Error!!!" });
  }
});

// register - address is still /api/users/register
userRouter.post("/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    // console.log(username, email, password)
    // let hash = bcrypt.hashSync(password, 10)
    // password = hash   
    // console.log(password)
    const user = new User({ username, email, password });
    const newUser = await user.save();
    if (newUser) {
      const { _id, username, email, isAdmin } = newUser;
      const token = getToken(newUser);
      res.send({
        _id,
        username,
        email,
        isAdmin,
        token 
      })
    } else {
      res.send({ msg: "Invalid User Data" })
    }

  } catch (error) {
    res.send({ msg: "Invalid Username" });
  }
});

// ADMIN ONLY api/user is concat with app.use from server.js
// (app.use("/api/users", userRouter))
userRouter.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      username: "Bero",
      password: "test1212",
      email: "berpanos@gmail.com",
      isAdmin: true,
    });
    const addUser = await user.save();
    res.send(addUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default userRouter;
