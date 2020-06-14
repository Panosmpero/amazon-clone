import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const listener = app.listen(5000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
