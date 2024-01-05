const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value);
      },
      message: (props) => `${props.value} không phải số điện thoại hợp lệ`,
    },
  },
  location: {
    type: String,
  },
  home: {
    type: String,
  },
  address: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: {
      values: [
        "admin",
        "transactionStaff",
        "warehouseStaff",
        "transactionAdmin",
        "warehouseAdmin",
      ],
      message: (props) => `${props.value} không phải vai trò hợp lệ`,
    },
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Không phải địa chỉ email hợp lệ"],
  },
  home: {
    type: String,
  },
  password: {
    type: String,
  },
});

// Các hàm tiền xử lý
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //encrypt the password before saving
  this.password = await bcrypt.hash(this.password, 10);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePasswordInDB = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
