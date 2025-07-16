// routes/shop-routes.js
const express = require("express");
const router = express.Router();
const Shop = require("../models/shop-model");
const auth = require("../middleware/auth");

// Add a new shop (only for shopkeepers)
router.post("/", auth, async (req, res) => {
  try {
    const { name, address } = req.body;
    const role = req.user.role;
    console.log(role)
    if (role !== "shopkeeper") {
      return res.status(403).json({ msg: "Only shopkeepers can add shops" });
    }

    const newShop = new Shop({
      name,
      address,
      ownerId: req.user.id,
    });

    await newShop.save();
    res.status(201).json(newShop);
  } catch (err) {
    res.status(500).json({ msg: "Failed to add shop", error: err.message });
  }
});

// Get all shops
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find().populate("ownerId", "name email");
    res.json(shops);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// routes/shop-routes.js
router.get("/mine", auth, async (req, res) => {
  try {
    const myShops = await Shop.find({ ownerId: req.user.id });
    res.json(myShops);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch shop", error: err.message });
  }
});

// Get current shop of the logged-in shopkeeper
router.get('/myshop', auth, async (req, res) => {
  try {
    const shop = await Shop.findOne({ ownerId: req.user.id });
    if (!shop) return res.status(404).json({ msg: "Shop not found" });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching shop" });
  }
});


module.exports = router;
