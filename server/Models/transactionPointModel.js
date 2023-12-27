const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phone: String,
  email: String,
});

const userAccountSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const transactionPointSchema = new mongoose.Schema({
  transactionPointId: {
    type: String,
  },
  name: {
    type: String,
    // required: [true, "Vui lòng nhập tên điểm giao dịch"],
    trim: true,
    unique: true,
  },
  location: {
    type: String,
    // required: [true, "Vui lòng nhập tỉnh của điểm giao dịch"],
    enum: [
      "An Giang",
      "Bà Rịa - Vũng Tàu",
      "Bạc Liêu",
      "Bắc Giang",
      "Bắc Kạn",
      "Bắc Ninh",
      "Bến Tre",
      "Bình Dương",
      "Bình Định",
      "Bình Phước",
      "Bình Thuận",
      "Cà Mau",
      "Cao Bằng",
      "Đắk Lắk",
      "Đắk Nông",
      "Điện Biên",
      "Đồng Nai",
      "Đồng Tháp",
      "Gia Lai",
      "Hà Giang",
      "Hà Nam",
      "Hà Nội",
      "Hà Tĩnh",
      "Hải Dương",
      "Hải Phòng",
      "Hậu Giang",
      "Hòa Bình",
      "Hưng Yên",
      "Khánh Hòa",
      "Kiên Giang",
      "Kon Tum",
      "Lai Châu",
      "Lâm Đồng",
      "Lạng Sơn",
      "Lào Cai",
      "Long An",
      "Nam Định",
      "Nghệ An",
      "Ninh Bình",
      "Ninh Thuận",
      "Phú Thọ",
      "Quảng Bình",
      "Quảng Nam",
      "Quảng Ngãi",
      "Quảng Ninh",
      "Quảng Trị",
      "Sóc Trăng",
      "Sơn La",
      "Tây Ninh",
      "Thái Bình",
      "Thái Nguyên",
      "Thanh Hóa",
      "Thừa Thiên Huế",
      "Tiền Giang",
      "Trà Vinh",
      "Tuyên Quang",
      "Vĩnh Long",
      "Vĩnh Phúc",
      "Yên Bái",
      "Phú Yên",
      "Cần Thơ",
      "Đà Nẵng",
      "Hồ Chí Minh",
    ],
  },
  address: {
    type: String,
  },

  manager: {
    name: String,
    contact: contactSchema,
    userAccount: userAccountSchema,
  },
  wareHouseId: {
    type: String,
  },
});

const TransactionPoint = mongoose.model(
  "TransactionPoint",
  transactionPointSchema
);

module.exports = TransactionPoint;
