const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packageId: {
    type: String,
    // required: true,
    // unique: true,
  },
  packageStatus: {
    type: String,
    // require: true,
  },
  startLocation: {
    type: String,
    // required: true,
  },
  endLocation: {
    type: String,
    // required: true,
  },
  sender: {
    senderName: {
      type: String,
      required: [true, "Vui lòng nhập tên người gửi"],
    },
    senderPhone: {
      type: String,
      required: [true, "Vui lòng nhập số điện thoại người gửi"],
    },
    senderAddr: {
      type: String,
      require: [true, "Vui lòng nhập địa chỉ người gửi"],
    },
  },

  receiver: {
    receiverName: {
      type: String,
      required: [true, "Vui lòng nhập tên người nhận"],
    },
    receiverPhone: {
      type: String,
      required: [true, "Vui lòng nhập số điện thoại người nhận"],
    },
    receiverAddr: {
      type: String,
      require: [true, "Vui lòng nhập địa chỉ người nhận"],
    },
  },

  package: {
    productType: {
      type: String,
      require: true,
      enum: {
        values: ["parcel", "document"],
      },
    },
    productName: {
      type: String,
      required: [true, "Vui lòng nhập tên kiện hàng"],
    },
    productValue: {
      type: String,
      required: [true, "Vui lòng nhập giá trị thực"],
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
        required: true,
      },
    },

    productCategory: {
      type: [String],
    },
  },

  payment: {
    type: String,
    required: [true],
  },
  note: {
    type: String,
  },
});
const Packages = mongoose.model("Package", packageSchema);

module.exports = Packages;
