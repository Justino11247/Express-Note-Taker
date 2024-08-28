// importing essential modules
const express = require("express");
const path = require("path");
const router = express.Router();

// get /notes returns the notes.html file
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// get * returns the index.html file
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// router object is exported to be used elsewhere
module.exports = router;