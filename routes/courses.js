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
router
  .route("/")
  .get(
    advancedResults(Courses, {
      path: "bootamp",
      select: "name description"
    }),
    getCourses
  )
  .post(addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
