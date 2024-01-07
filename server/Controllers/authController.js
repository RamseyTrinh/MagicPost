const CustomError = require("../Utils/CustomError");
const User = require("../Models/userModel");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { randomBytes } = require("crypto");

dotenv.config();

const DEFAULT_USER_ID = 0;

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};
function extractLocation(address) {
  const regex = /, (Tỉnh |Thành phố )\s*([^,]+)/;
  const match = address.match(regex);
  if (match && match[2]) {
    return match[2].trim();
  }

  return null;
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Có lỗi xảy ra khi lấy danh sách người dùng",
    });
  }
};

exports.getUserById = async function getUserById(req, res) {
  const userId = req.params.id;
  const user = await User.findOne({ userId });

  return res
    .status(user ? 200 : 404)
    .json(user ? user : { error: "Không tìm thấy nhân viên" });
};

exports.getTransactionAdmin = async (_, res) => {
  try {
    const specificRoles = ["transactionAdmin"];
    const users = await User.find({ role: specificRoles });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Có lỗi xảy ra khi lấy thông tin người dùng",
    });
  }
};

exports.getWarehouseAdmin = async (_, res) => {
  try {
    const specificRoles = ["warehouseAdmin"];
    const users = await User.find({ role: specificRoles });
    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Có lỗi xảy ra khi lấy thông tin người dùng",
    });
  }
};

exports.getTransactionStaff = async (req, res) => {
  try {
    const location = req.params.location;
    const user = await User.find({
      location: location,
      role: "transactionStaff",
    });
    if (!user || user.length === 0) {
      return res.status(404).json({
        error: `Không có nhân viên tại điểm này`,
      });
    }
    return res.status(200).json({
      status: "Success",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Có lỗi xảy ra khi lấy thông tin người dùng",
    });
  }
};
exports.getWarehouseStaff = async (req, res) => {
  try {
    const location = req.params.location;
    const users = await User.find({
      location: location,
      role: "warehouseStaff",
    });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Có lỗi xảy ra khi lấy thông tin người dùng",
    });
  }
};

function generateUserId() {
  const randomBuffer = randomBytes(3); // 4 bytes (32 bits)
  const packagesId = parseInt(randomBuffer.toString("hex"), 16);
  return `MNV${packagesId}`;
}

exports.addTransactionAdmin = async (req, res) => {
  const user = req.body;
  try {
    // const manager = await User.findOne({
    //   location: user.location,
    //   role: user.role,
    // });
    // if (manager) {
    //   throw new Error("Điểm này đã có quản lý!");
    // }
    const newUserId = generateUserId();
    const newUser = Object.assign(user, {
      userId: newUserId,
      role: "transactionAdmin",
      name: user.pointAdminName,
      location: user.address,
      email: user.email,
      phoneNumber: user.phoneNumber,
      home: user.specificAdd,
    });
    await User.create(newUser);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(201).json({
    status: "create success",
    user,
  });
};

exports.addWarehouseAdmin = async (req, res) => {
  const user = req.body;
  try {
    const newUserId = generateUserId();
    const newUser = Object.assign(user, {
      userId: newUserId,
      role: "warehouseAdmin",
      name: user.pointAdminName,
      location: user.address,
      email: user.email,
      phoneNumber: user.phoneNumber,
      home: user.specificAdd,
    });
    await User.create(newUser);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(201).json({
    status: "create success",
    user,
  });
};

exports.addNewUserByTransactionAdmin = async (req, res) => {
  const user = req.body;
  try {
    const newUserId = generateUserId();
    const newUser = Object.assign(user, {
      userId: newUserId,
      home: user.specificAdd,
      location: user.transactionPoint,
      role: "transactionStaff",
    });
    await User.create(newUser);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(201).json({
    status: "create success",
    user,
  });
};

exports.addNewUserByWarehouseAdmin = async (req, res) => {
  const user = req.body;
  try {
    const newUserId = generateUserId();
    const newUser = Object.assign(user, {
      userId: newUserId,
      location: user.location,
      role: "warehouseStaff",
      home: user.specificAdd,
      location: user.warehousePoint,
    });
    await User.create(newUser);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(201).json({
    status: "create success",
    user,
  });
};

// SignUp function
exports.signup = asyncErrorHandler(async (req, res) => {
  const newUser = await User.create(req.body);
  // newUser.userId = generateUserId();
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "Signup success",
    data: {
      user: newUser,
    },
  });
});

// Login function
exports.login = asyncErrorHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      message: "Tên đăng nhập và mật khẩu không để trống!",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);

  //check if match
  if (!user || !(await user.comparePasswordInDB(password, user.password))) {
    return res.status(400).json({
      message: "Sai tên đăng nhập hoặc mật khẩu!",
    });
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "Login success",
    token,
    user,
  });
});

// Hàm xóa tài khoản người dùng
exports.deleteUser = async (req, res, next) => {
  const userId = req.params;
  const deletedUser = await User.findOneAndDelete(userId);
  if (!deletedUser) {
    const error = new CustomError("Người dùng không tìm thấy", 404);
    return next(error);
  }
  res.status(204).json({
    status: "success",
    data: null,
    message: "Đã xóa thành công",
  });
};
