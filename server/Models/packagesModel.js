const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  sender: {
    senderName: {
      type: String,
      required: [true, "Please enter name of sender."],
    },
    senderPhone: {
      type: String,
      required: [true, "Please enter phone number of sender"],
    },
    senderAddr: {
      type: String,
      require: [true, "Please choose Address of sender"],
    },
    senderAd: {
      type: String,
      require: [true, "Please..."],
    },
  },

  receiver: {
    receiverName: {
      type: String,
      required: [true, "Please enter name of sender."],
    },
    receiverPhone: {
      type: String,
      required: [true, "Please enter phone number of sender"],
    },
    receiverAddr: {
      type: String,
      require: [true, "Please choose Address of sender"],
    },
    receiverAd: {
      type: String,
      require: [true, "Please..."],
    },
  },

  package: {
    productType: {
      type: String,
      require: true,
      enum: {
        values: ["parcel", "document"],
        message: "Type of production does not exist",
      },
    },
    productName: {
      type: String,
      required: [true],
    },
    productValue: {
      type: String,
      required: [true],
    },
    productWeigh: {
      type: String,
      required: [true],
    },
    quantity: {
      type: String,
      required: [true],
    },
    size: {
      length: {
        type: String,
        required: [true],
      },
      width: {
        type: String,
        required: [true],
      },
      height: {
        type: String,
        required: [true],
      },
    },

    productCategory: {
      type: [String],
      required: [true],
    },
  },

  payment: {
    type: String,
    required: [true],
  },
  note: {
    type: String,
  },
  orderID: {
    type: String,
    unique: true,
  },
});
const Packages = mongoose.model("package", packageSchema);

module.exports = Packages;
