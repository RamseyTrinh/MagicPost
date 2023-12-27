const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  packagesId: {
    type: String,
    required: true,
    unique: true,
  },
  fromtransactionPoint: {
    type: String,
  },
  fromWareHouse: {
    type: String,
  },
  totransactionPoint: {
    type: String,
  },
  toWareHouse: {
    type: String,
  },
  fromWareHouse: {
    type: String,
  },
  currentPoint: {
    type: String,
  },
  route: [
    {
      pointName: {
        type: String,
      },
      timestamp: {
        type: String,
      },
    },
  ],
  done: {
    type: Boolean,
    require: true,
  },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
