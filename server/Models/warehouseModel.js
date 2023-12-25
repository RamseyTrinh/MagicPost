const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phone: String,
  email: String,
});

const userAccountSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const wareHouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên điểm tập kết"],
    trim: true,
    unique: true,
  },
  province: {
    type: String,
    required: [true, "Vui lòng nhập địa chỉ của điểm tập kết"],
    enum: ["Miền Bắc", "Miền Trung", "Miền Nam"],
  },
  address: {
    type: String,
  },

  manager: {
    name: String,
    contact: contactSchema,
    userAccount: userAccountSchema,
  },
});

const wareHouse = mongoose.model("wareHouse", wareHouseSchema);

module.exports = wareHouse;
