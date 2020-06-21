import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  stockCount: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  renewed: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
