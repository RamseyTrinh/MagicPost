const CustomError = require("../Utils/CustomError");
const User = require("../Models/userModel");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const util = require("util");
const dotenv = require("dotenv");
const { randomBytes } = require("crypto");
// const bcrypt = require("bcryptjs");
dotenv.config();

const DEFAULT_USER_ID = 0;

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

exports.getAllUsers = async function getAllUsers(req, res) {
  try {
    // Truy vấn tất cả người dùng từ cơ sở dữ liệu
    const users = await User.find();

    // Trả về danh sách người dùng
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

exports.ChangeUserProfile = async function ChangeUserProfile(req, res) {
  const userId = req.body.userId;
  const userProfile = req.body;
  console.log(userProfile);
  console.log(req.body);
  const user = await User.findOne({ userId: userId });

  try {
    if (userProfile.name) {
      user.name = userProfile.name;
    }
    if (userProfile.email) {
      user.email = userProfile.email;
    }
    if (userProfile.phone) {
      user.phone = userProfile.phone;
    }
    if (userProfile.avartar) {
      user.avartar = userProfile.avartar;
    }

    await user.save();
    return res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Có lỗi xảy ra" });
  }
};

exports.getUserByName = async function getUserByName(req, res) {
  try {
    const userName = req.params.name;

    // Truy vấn người dùng theo tên từ cơ sở dữ liệu
    const user = await User.findOne({ name: userName });

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({
        error: "Người dùng không tồn tại",
      });
    }

    // Trả về thông tin người dùng
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Có lỗi xảy ra khi lấy thông tin người dùng",
    });
  }
};

exports.getTransactionAdmin = async (_, res) => {
  try {
    const specificRoles = ["transactionAdmin"];
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
    const users = await User.find({
      location: location,
      role: "transactionStaff",
    });
    if (!users || users.length === 0) {
      return res.status(404).json({
        error: `Không có nhân viên tại điểm này`,
      });
    }

    return res.status(200).json({
      length: users.length,
      users: users,
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
    if (!users || users.length === 0) {
      return res.status(404).json({
        error: `Không có nhân viên đó tại điểm này`,
      });
    }

    return res.status(200).json({
      length: users.length,
      users: users,
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

exports.addNewUser = async function addNewUser(req, res) {
  const user = req.body;

  try {
    if (user.role === "transactionAdmin" || user.role === "warehouseAdmin") {
      const manager = await User.findOne({
        location: user.location,
        role: user.role,
      });
      if (manager) {
        throw new Error("Điểm này đã có quản lý!");
      }
    }
    const newUserId = generateUserId();
    const newUser = Object.assign(user, {
      userId: newUserId,
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

exports.getUserByEmail = async function getUserByEmail(req, res) {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided email.",
      });
    }

    // You can customize the response based on your user model structure
    const userData = {
      userId: user.userId,
      email: user.email,
      phoneNumber: user.phoneNumber,
      location: user.location,
      // Add other fields as needed
    };

    res.status(200).json({
      success: true,
      message: "User information retrieved successfully.",
      data: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching user information.",
      error: error.message,
    });
  }
};

exports.protect = asyncErrorHandler(async (req, res, next) => {
  //1. Read the token & check if it exist
  const testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith("bearer")) {
    token = testToken.split(" ")[1];
  }
  if (!token) {
    next(new CustomError("You are not to logged in!", 401));
  }

  //2. validate the token
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_STR
  );

  //3. If the user exists
  const user = await User.findById(decodedToken.id);

  if (!user) {
    const error = new CustomError("The user does not exist", 401);
    next(error);
  }

  // allow access
  req.user = user;
  next();
});

exports.restrict = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      const error = new CustomError(
        "You do not have permission to do this",
        403
      );
      next(error);
    }
    next();
  };
};
