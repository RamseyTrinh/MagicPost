const CustomError = require("../Utils/CustomError");
const User = require("./../Models/userModel");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const util = require("util");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "Signup success",
    token,
    data: {
      user: newUser,
    },
  });
});

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
