const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  senderInfo: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  recipientInfo: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  recipientFees: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  goodsType: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  costInfo: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  weightInfo: {
    type: mongoose.Schema.Types.Mixed,
  },
  sizeInfo: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
  doneDate: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Order", ordersSchema);
