const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packagesId: {
    type: String,
  },
  packagesStatus: {
    type: String,
  },
  createdDate: {
    type: String,
  },
  startLocation: {
    type: String,
  },
  endLocation: {
    type: String,
  },
  currentPoint: {
    type: String,
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
    senderAdd: {
      type: String,
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
    receiverAdd: {
      type: String,
    },
  },

  package: {
    productType: {
      type: String,
    },
    productName: {
      type: String,
    },
    productValue: {
      type: String,
    },
    productWeight: {
      type: String,
    },
    productWeigh: {
      type: String,
    },
    size: {
      length: {
        type: String,
      },
      width: {
        type: String,
      },
      height: {
        type: String,
      },
    },

    productCategory: {
      type: { type: String },
    },
  },

  payment: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});
const Packages = mongoose.model("Package", packageSchema);

module.exports = Packages;
