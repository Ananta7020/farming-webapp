const express = require("express");
const router = express.Router();
const Crop = require("../models/crop-model.js");

router.get("/", async (req, res) => {
  const crops = await Crop.find();
  res.json(crops);
});

router.post("/", async (req, res) => {
  const crop = new Crop(req.body);
  await crop.save();
  res.json(crop);
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCrop = await Crop.findByIdAndDelete(req.params.id);
    if (!deletedCrop) {
      return res.status(404).json({ msg: "Crop not found" });
    }
     res.status(200).json({ msg: 'Crop deleted successfully' });
  } catch(error) {
    console.error('Error deleting crop:', error.message);
    res.status(500).json({ msg: 'Server error while deleting crop' });
  }
});

module.exports = router;
