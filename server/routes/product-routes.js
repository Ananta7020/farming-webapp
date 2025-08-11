const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
const auth = require("../middleware/auth");

// ✅ Add new product
router.post("/", auth, async (req, res) => {
  const { name, price, description, shopId } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      shopId,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: "Error adding product", error: err.message });
  }
});

// ✅ Get all products for a specific shop
router.get("/shop/:shopId", async (req, res) => {
  try {
    const products = await Product.find({ shopId: req.params.shopId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching products" });
  }
});

// ✅ Delete product by product ID
router.delete("/:productId", auth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.productId);
    if (!deleted) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting product", error: err.message });
  }
});

module.exports = router;
