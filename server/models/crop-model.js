const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  plantedDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Crop", cropSchema);
