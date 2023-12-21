const mongoose = require("mongoose");

const transactionPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên"],
    unique: true,
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Vui lòng nhập địa chỉ"],
  },
  managerID: {
    type: String,
  },
});

const TransactionPoint = mongoose.model(
  "TransactionPoint",
  transactionPointSchema
);

module.exports = TransactionPoint;
