const CustomError = require("../Utils/CustomError");
const User = require("./../Models/userModel");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const util = require("util");
const dotenv = require("dotenv");
dotenv.config();

// Lấy defaultId để khi tạo nhân viên mới có ID là kế tiếp
const DEFAULT_USER_ID = 0;

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

// Hàm lấy ra tất cả các nhân viên
exports.getAllUsers = async function getAllUsers(req, res) {
  const { role, location, searchTerm } = req.query;

  const roleRegex = new RegExp(role, "i");
  const locRegex = new RegExp(location, "i");
  const termRegex = new RegExp(searchTerm, "i");

  const queryFilter = {
    location: locRegex,
    $or: [{ name: { $regex: termRegex } }, { email: { $regex: termRegex } }],
  };

  if (role === "") {
    queryFilter.role = { $ne: "Admin" };
  } else {
    queryFilter.role = roleRegex;
  }

  const users = await User.find(queryFilter);

  return res.status(200).json(users);
};

exports.getUserById = async function getUserById(req, res) {
  const userId = Number(req.params.id);
  const user = await User.findOne({ userId });

  return res
    .status(user ? 200 : 404)
    .json(user ? user : { error: "User not found" });
};

exports.ChangeUserProfile = async function ChangeUserProfile(req, res) {
  const userId = req.body.userId; // Tại sao console.log trả ra undefined
  const userProfile = req.body;
  console.log(userProfile);
  console.log(req.body);
  const user = await User.findOne({ userId: Number(userId) });
  console.log(user);
  console.log(userId);

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

// async function getUserByEmail(email) {
//   return await User.findOne({ email: email });
// }

// Các hàm để tạo người dùng mới
async function getLatestUserId() {
  const latestUser = await User.findOne().sort("-userId");
  if (!latestUser) {
    return DEFAULT_USER_ID;
  }

  return latestUser.userId;
}

async function createNewUser(user) {
  const existedUser = await User.findOne({ email: `${user.email}` });
  if (existedUser) {
    throw new Error(`Account with the same email existed`);
  }

  if (user.role === "Manager") {
    const manager = await User.findOne({
      location: user.location,
      role: "Manager",
    });
    if (manager) {
      throw new Error("This location already had a Manager");
    }
  }

  const newUserId = (await getLatestUserId()) + 1;
  const newUser = Object.assign(user, {
    userId: newUserId,
    name: user.name,
    email: user.email,
    role: user.role,
    location: user.location,
    password: await getHashedPassword(user.password),
  });
  await User.create(newUser);
}

exports.addNewUser = async function addNewUser(req, res) {
  const user = req.body;

  // Lấy thông tin người dùng đang thực hiện yêu cầu
  // console.log(req.uid);
  const requestingUser = await User.findOne(req.uid);
  if (
    requestingUser.role !== "Admin" &&
    !(
      requestingUser.role == "Manager" &&
      requestingUser.location == user.location
    )
  ) {
    console.log(user.location);
    return res.status(401).json({
      error: "Bạn không có quyền truy cập!",
    });
  }

  try {
    await createNewUser(user);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(201).json(user);
};

// SignUp function
exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

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
    user: {
      role: user.role,
    },
  });
});

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
