const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  route: [
    {
      transactionPointId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TransactionPoint",
        ref: "Warehouse",
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
