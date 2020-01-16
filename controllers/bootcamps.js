// @desc    GET ALL BOOTCAMPS
// @route   GET /api/v1/bootcamps
// @access  Public

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Showing all bootcamps" });
};

// @desc    GET SINGLE BOOTCAMPS
// @route   GET /api/v1/bootcamps/:id
// @access  Public

exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Showing bootcamp ${req.params.id}` });
};

// @desc    CREATE NEW BOOTCAMP
// @route   POST /api/v1/bootcamps
// @access  Private

exports.createBootcamp = (req, res, next) => {
  res.status(201).json({ success: true, msg: `Create new bootcamp` });
};

// @desc    UPDATE BOOTCAMP
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

// @desc    DELETE BOOTCAMP
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
