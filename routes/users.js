const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userPhotoUpload
} = require("../controllers/users");

const User = require("../models/User");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
// router.use(authorize("admin"));

router
  .route("/")
  .get(advancedResults(User), getUsers)
  .post(authorize("admin"), createUser);

router
  .route("/:id")
  .get(getUser)
  .put(authorize("admin"), updateUser)
  .delete(authorize("admin"), deleteUser);

router.route("/:id/photo").put(protect, userPhotoUpload);

module.exports = router;
