const Note = require("../models/notesMoudel");
const asyncHandler = require("express-async-handler");

const getAllNotes = asyncHandler(async (req, res) => {
  if (!req.isAdmin) {
    res.status(403);
    throw new Error("Not authorized to access this route");
  }

  const notes = await Note.find();
  res.json(notes);
});

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  // Check if the authenticated user is an admin
  if (req.isAdmin) {
    // Admin can update any note
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;

      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  } else {
    // If not an admin, check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    // Regular user can update their own note
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  // Check if the authenticated user is an admin
  if (req.isAdmin) {
    // Admin can delete any note
    if (note) {
      await note.remove();
      res.json({ message: "Note Removed" });
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }
  } else {
    // If not an admin, check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }

    if (note) {
      await note.remove();
      res.json({ message: "Note Removed" });
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }
  }
});

module.exports = {
  getAllNotes,
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};
