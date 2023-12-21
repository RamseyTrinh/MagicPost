const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên!"],
    unique: true,
    trim: true,
  },
  location: {
    type: String,
  },
  managerID: {
    type: String,
  },
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
