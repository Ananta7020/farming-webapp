const express = require("express");
const Expense = require("../models/expence-model");
const auth = require("../middleware/auth"); 
const router = express.Router();

// Get all expence for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const expence = await Expense.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(expence);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Add new expense
router.post("/", auth, async (req, res) => {
  console.log("Received expense:", req.body);
  console.log("From user:", req.user.id); // this should print user
  try {
    const expense = new Expense({ ...req.body, userId: req.user.id });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Edit  expense
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Expense not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete  expense
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ msg: "Expense not found" });
    res.json({ msg: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
