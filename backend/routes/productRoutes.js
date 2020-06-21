import express from "express";
import Product from "../models/product";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

// All Products List
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// Product Details 
router.get("/:id", async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({ _id: id });
  if (product) return res.send(product);
  return res.status(404).send({ msg: "Product Not Found." });
});

// Create New Product
router.post("/", isAuth, isAdmin, async (req, res) => {
  const {
    title,
    image,
    price,
    brand,
    category,
    stockCount,
    description,
    rating,
    numReviews,
    renewed,
  } = req.body;

  const product = new Product({
    title,
    image,
    price,
    brand,
    category,
    stockCount,
    description,
    rating,
    numReviews,
    renewed,
  });
  const newProduct = await product.save();
  
  if (newProduct) {
    return res
      .status(201)
      .send({ msg: "New Product Created.", data: newProduct });
  } 
  return res.status(500).send({ msg: "Error Creating Product" });
});

// Update Product
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (product) {
    const {
      title,
      image,
      price,
      brand,
      category,
      stockCount,
      description,
      rating,
      numReviews,
      renewed,
    } = req.body;

    product.title = title;
    product.image = image;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.stockCount = stockCount;
    product.description = description;
    product.renewed = renewed;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ msg: "Product Updated.", data: updatedProduct });
    }
  } 
  return res.status(500).send({ msg: "Error Updating Product" });
});

// Delete a Product
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Product.findById(id);
  if (deleteProduct) {
    await deleteProduct.remove();
    return res.send({ msg: "Product Deleted Successfully." })
  }
  return res.send({ msg: "Error Deleting Product." })
})

export default router;
