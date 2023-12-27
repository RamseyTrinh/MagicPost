const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  // orderId: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  packagesId: {
    type: String,
    required: true,
    unique: true,
  },
  fromtransactionPoint: {
    type: String,
    // required: true,
  },
  totransactionPoint: {
    type: String,
    // required: true,
  },
  toWareHouse: {
    type: String,
    // required: true,
  },
  fromWareHouse: {
    type: String,
    // required: true,
  },
  currentPoint: {
    type: String,
    //require: true,
  },
  route: [
    {
      pointName: {
        type: String,
        //required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
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
