const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phone: String,
  email: String,
});

const userAccountSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const agentSchema = new mongoose.Schema({
  name: String,
  contact: contactSchema,
  userAccount: userAccountSchema,
});

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên điểm tập kết"],
    trim: true,
  },
  address: {
    // required: [true, "Vui lòng nhập địa chỉ điểm tập kết"],
    city: String,
    detail: String,
  },
  contacts: [contactSchema],
  manager: {
    name: String,
    contact: contactSchema,
    userAccount: userAccountSchema,
  },
  agents: [agentSchema],
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
