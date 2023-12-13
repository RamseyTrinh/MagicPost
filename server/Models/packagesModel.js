const mongoose = require("mongoose");
const packagesController = require("../Controllers/packagesController");
const packageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  destinition: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 1.0,
  },
});
const Packages = mongoose.model("package", packageSchema);

module.exports = Packages;
