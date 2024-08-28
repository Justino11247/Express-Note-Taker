// Importing essential modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

//reads the data on the db.json file.
// Returns promise. resolves or error
const readFromFile = (filePath) =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, "utf8", (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );

// Helper function writes the data on the db.json file.
// Returns a promise. resolves or error
const writeToFile = (filePath, content) =>
  new Promise((resolve, reject) =>
    fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) =>
      err ? reject(err) : resolve()
    )
  );

//generate a random 4-digit ID
const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};


router.get("/", async (req, res) => {
  try {
    const noteData = await readFromFile(path.join(__dirname, "../db/db.json"));

    res.json(JSON.parse(noteData));

  } catch (err) {

    res.status(500).json({ error: "No notes data read." });

  }
});


router.post("/", async (req, res) => {
  try {
    const { title, text } = req.body; // title/text from request body
    const newNotes = { id: generateRandomId(), title, text }; // new note created with a unique ID
    const noteData = await readFromFile(path.join(__dirname, "../db/db.json"));
    const notes = JSON.parse(noteData); // pasrse existing notes
    notes.push(newNotes); // add new note to array

    await writeToFile(path.join(__dirname, "../db/db.json"), notes);
    res.json(newNotes);

  } catch (err) {

    res.status(500).json({ error: "Save note failed." }); // handles errors

  }
});


router.delete("/:id", async (req, res) => {
  const noteId = req.params.id; // note ID from request params
  const noteData = await readFromFile(path.join(__dirname, "../db/db.json"));
  const notes = JSON.parse(noteData);
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ error: "No note was found." });
  }

  const updateNotes = notes.filter((note) => note.id !== noteId); // filter note to delete
  await writeToFile(path.join(__dirname, "../db/db.json"), updateNotes);
  res.json({ message: "Note has has successfully been deleted." }); // success message
});

module.exports = router;