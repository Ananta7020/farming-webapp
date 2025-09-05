const express = require("express");
const router = express.Router();

const Cart = require("../models/cart-model");
const auth = require("../middleware/auth");

const mongoose = require("mongoose");
// ...
router.post("/add", auth, async (req, res) => {
  const { productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }

  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, products: [] });
    }

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ productId: new mongoose.Types.ObjectId(productId), quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Error adding to cart", error: err.message });
  }
});


// Get cart
router.get("/my", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );
    res.json(cart || { products: [] });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching cart", error: err.message });
  }
});

// Delete from cart
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ msg: "cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== req.params.productId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "error removing from cart", error: err.message });
  }
});

module.exports = router;
