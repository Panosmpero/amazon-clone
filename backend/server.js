import express from "express";
// import data from "./data";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

// get env from frontend folder
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../frontend/.env") });

// connect mongodb
const mongooseURI = process.env.MONGOOSE_URI; // process.env.MONGOOSE_URI or "mongodb://localhost/AmazonClone"
mongoose.connect(
  mongooseURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log("Cannot connect to db " + err);
    console.log("DB connected");
  }
);

const app = express();
app.use(cors());
// old bodyparser now included in express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
app.use("/api/products", productRoutes);

// app.get("/api/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find(product => product._id === productId);
//   product
//     ? res.send(product)
//     : res.status(404).send({msg: "Product Not Found."})
// });

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

const listener = app.listen(5000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
