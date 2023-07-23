const express = require("express");

const {
  registerUser,
  authUser,
  updateUserProfile,
  createDefaultAdminIfNotExists,
  generateMultipleUsers,
} = require("../controllers/userCotroler");
const notes = require("../data/notes");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser, createDefaultAdminIfNotExists);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
