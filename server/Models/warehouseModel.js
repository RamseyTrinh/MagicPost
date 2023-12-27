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
  warehouseId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  location: {
    type: String,
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
