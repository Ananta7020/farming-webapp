const express = require('express');
const router = express.Router();
const Crop = require('../models/crop-model.js');

router.get('/', async (req, res) => {
  const crops = await Crop.find();
  res.json(crops);
});

router.post('/', async (req, res) => {
  const crop = new Crop(req.body);
  await crop.save();
  res.json(crop);
});

module.exports = router;
