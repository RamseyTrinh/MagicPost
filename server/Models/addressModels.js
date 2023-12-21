const mongoose = require("mongoose");

import mysql from "mysql";

const Schema = mysql.Schema;
const provinces = require("../utils/provinces");
const AddressSchema = new Schema({
  province: {
    type: String,
    enum: provinces.getProvinceNames(),
  },
  area: {
    type: String,
    enum: provinces.getAreas(),
  },
  side: {
    type: String,
    enum: provinces.getSides(),
  },
});
const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
