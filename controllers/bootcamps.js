const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const path = require("path");

// @desc    GET ALL BOOTCAMPS
// @route   GET /api/v1/bootcamps
// @access  Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // COPY REQ.QUERY
  const reqQuery = { ...req.query };

  // FIELDS TO EXCLUDE
  const removeFields = ["select", "sort", "page", "limit"];

  //  LOOP OVER removeFields AND DELETE THEM FROM reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // CREATE QUERY STRING
  let queryStr = JSON.stringify(reqQuery);

  // CREATE OPERATORS ($gt, $gte , etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // FINDING RESOURCE
  query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");

  // SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // SORT
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // PAGINATION
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // EXCECUTING QUERY
  const bootcamps = await query;

  // PAGINATION RESULT
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps
  });
});

// @desc    GET SINGLE BOOTCAMPS
// @route   GET /api/v1/bootcamps/:id
// @access  Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  {
    !bootcamp
      ? new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      : res.status(200).json({ success: true, data: bootcamp });
  }
});

// @desc    CREATE NEW BOOTCAMP
// @route   POST /api/v1/bootcamps
// @access  Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc    UPDATE BOOTCAMP
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcamp not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    DELETE BOOTCAMP
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  bootcamp.remove();
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    GET BOOTCAMPS WITHIN A RADIUS
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // GET LAT/LANG FROM GEOCODER
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // CALC RADIUS USING RADIANS
  // DIVIDE DIST BY RAIUS OF EARTH
  // EARTH RADIUS = 3,963 mi

  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});

// @desc    UPLOAD PHOTO FOR BOOTCAMP
// @route   PUT /api/v1/bootcamps/:id/photo
// @access  Private

exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
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
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findOneAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
  console.log(file.name);
});
