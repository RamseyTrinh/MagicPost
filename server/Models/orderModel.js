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
  fromWarehouse: {
    type: String,
  },
  totransactionPoint: {
    type: String,
  },
  toWarehouse: {
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
  orderStatus: {
    type: String,
  },
  done: {
    type: Boolean,
  },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
