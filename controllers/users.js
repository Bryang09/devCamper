const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");

// @desc    Get All Users
// @route   GET /api/v1/users
// @access  Private/Admin

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Single User
// @route   GET /api/v1/users/:id
// @access  Private/Admin

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({ success: true, data: user });
});

// @desc    Create User
// @route   POST /api/v1/users
// @access  Private/Admin

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({ success: true, data: user });
});

// @desc    Update User
// @route   PUT /api/v1/users/:id
// @access  Private/Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: user });
});

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});

// @desc    UPLOAD PHOTO FOR User
// @route   PUT /api/v1/users/:id/photo
// @access  Private

exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  // MAKE SURE USER
  if (user._id.toString() !== req.user.id && req.user.role !== "admin") {
    return new ErrorResponse(
      `Users ${req.params.id} is not authorized to upload photo`,
      401
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;

  // MAKE SURE IMAGE IS A PHOTO
  if (!file.mimetype.startsWith("image")) {
    return next("Please upload an image file", 400);
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // CREATE CUSTOM FILENAME
  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.USER_FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await User.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
  console.log(file.name);
});
