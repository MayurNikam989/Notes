const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/note");

const Router = express.Router();

//Route 1: api/notes/fetchnotes =>fetch notes of user using GET -- login required
Router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    //finding notes by user id
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

//Route 2: api/notes/addnote =>add notes of user usinf POST -- login required
Router.post(
  "/addnote",
  fetchuser,
  [
    //Validation of request body
    body("title", "Enter Valid title").isLength({ min: 3 }),
    body(
      "description",
      "description should be of minimum 5 character"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // If there are errors then
      return res.status(400).json({ errors: result.array() });
    }
    try {
      //extracting body for note details
      const { title, description, type } = req.body;
      //creating new note
      const note = new Note({ title, description, type, user: req.user.id });
      //saving note in database
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: api/notes/updatenote =>update notes of user using PUT -- login required
Router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const newNote = {};
    //Creating a new note and updaing values
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (type) newNote.type = type;

    //Check the node tobe updated exist or not
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found ");
    }

    //check if the use authorized
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed ");
    }

    //update current note with newNote
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

//Route 4: api/notes/addnotes =>add notes of user using DELETE -- login required
Router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Check the node tobe updated exist or not
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found ");
    }

    //check if the use authorized
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed ");
    }

    //delete current note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
module.exports = Router;
