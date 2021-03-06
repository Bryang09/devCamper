const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// PROTECT ROUTES
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // MAKE SURE TOOKEN EXISTS
  if (!token) {
    return next(new ErrorResponse("Not Authorized to Access This Route", 401));
  }

  try {
    //   VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse("Not Authorized to Access This Route", 401));
  }
});

// GRANT ACCESS TO SPECIFIC ROLES
exports.authorize = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      return next(
        new ErrorResponse(
          `User role "${role}" is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
