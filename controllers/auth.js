const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //   CREATE USER
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  //   CREATE TOKEN
  const token = user.getSignedJWTToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //  VALIDATE EMAIL AND PASSWORD
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  //   CHECK FOR USER
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  //   CHECK IF PASSWORD MATCHES
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  //   CREATE TOKEN
  const token = user.getSignedJWTToken();

  res.status(200).json({ success: true, token });
});
