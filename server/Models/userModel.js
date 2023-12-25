const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

//name, email, password, confirmPassword, photo
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: false,
  },
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên nhân viên"],
    trim: true,
    maxLength: 60,
  },

  phoneNumber: {
    type: String,
    required: [true, "Vui lòng nhập số điện thoại"],
    validate: {
      validator: function (value) {
        // Phone number has 10 digits
        return /^[0-9]{10}$/.test(value);
      },
      message: (props) => `${props.value} không phải số điện thoại hợp lệ`,
    },
    unique: true,
  },
  location: {
    type: String,
    required: false,
  },
  avartar: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    // required: [true, "Vui lòng nhập chức vụ"],
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
    required: [true, "Vui lòng nhập email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Không phải địa chỉ email hợp lệ"],
  },
  password: {
    type: String,
    required: [false, "Vui lòng nhập mật khẩu"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [false, "Vui lòng xác nhận lại mật khẩu"],
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "Mật khẩu không trùng nhau",
    },
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
