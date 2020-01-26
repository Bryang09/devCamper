const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");

const Courses = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Courses, {
      path: "bootamp",
      select: "name description"
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "admint"), addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admint"), updateCourse)
  .delete(protect, authorize("publisher", "admint"), deleteCourse);

module.exports = router;
