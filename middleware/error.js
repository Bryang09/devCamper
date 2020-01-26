const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // log to console for dev
  console.log(err.stack.red.underline);

  //  MONGOOSE BAD OBJECT ID

  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // MONGOOSE DUPLICATE KEY
  if (err.code === 11000) {
    const message = "Duplicate Field Value Entered";

    error = new ErrorResponse(message, 400);
  }

  //  MONGOOSE VALIDATION ERROR
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);

    error = new ErrorResponse(message, 400);
  }

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: error.message || "Service Error" });
};

module.exports = errorHandler;
