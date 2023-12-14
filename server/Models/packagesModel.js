const mongoose = require("mongoose");
const packagesController = require("../Controllers/packagesController");
const packageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  destinition: {
    type: String,
  },
  status: {
    type: String,
    enum: {
      values: ["recieved", "delivering", "takingup", "shipping"],
    },
  },
});
const Packages = mongoose.model("package", packageSchema);

module.exports = Packages;
