import express from "express";
import data from "./data";

const app = express();

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(product => product._id === productId);
  product 
    ? res.send(product)
    : res.status(404).send({msg: "Product Not Found."}) 
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const listener = app.listen(5000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
