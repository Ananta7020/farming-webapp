const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: String,
  type: String,
  plantedDate: Date,
  harvestDate: Date
});

module.exports = mongoose.model('Crop', cropSchema);
