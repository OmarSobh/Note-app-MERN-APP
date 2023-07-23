const express = require("express");
const {
  getAllNotes,
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getAllNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
