const express = require("express");
const router = express.Router();
const Crop = require("../models/crop-model.js");
const auth = require("../middleware/auth"); 

router.get("/", auth,async (req, res) => {
  const crops = await Crop.find({userId: req.user.id});
  res.json(crops);
});

router.post("/", auth,async (req, res) => {
  const crop = new Crop({...req.body,userId:req.user.id});
  await crop.save();
  res.json(crop);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, userId: req.user.id });
    if (!crop) {
      return res.status(404).json({ msg: "Crop not found or unauthorized" });
    }

    await Crop.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: "Crop deleted successfully" });
  } catch (error) {
    console.error("Error deleting crop:", error.message);
    res.status(500).json({ msg: "Server error while deleting crop" });
  }
});


module.exports = router;
