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

const transactionPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên điểm giao dịch"],
    required: true,
    trim: true,
  },
  address: {
    city: String,
    // required: [true, "Vui lòng nhập tên địa điểm"],
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

const TransactionPoint = mongoose.model(
  "TransactionPoint",
  transactionPointSchema
);

module.exports = TransactionPoint;
