const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");

// @desc    GET ALL BOOTCAMPS
// @route   GET /api/v1/bootcamps
// @access  Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // COPY REQ.QUERY
  const reqQuery = { ...req.query };

  // FIELDS TO EXCLUDE
  const removeFields = ["select", "sort"];

  //  LOOP OVER removeFields AND DELETE THEM FROM reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // CREATE QUERY STRING
  let queryStr = JSON.stringify(reqQuery);

  // CREATE OPERATORS ($gt, $gte , etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // FINDING RESOURCE
  query = Bootcamp.find(JSON.parse(queryStr));

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

  // EXCECUTING QUERY
  const bootcamps = await query;

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
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
  const bootcamp = Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcamp not found with id of ${req.params.id}`,
      404
    );
  }
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
