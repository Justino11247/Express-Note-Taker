const express = require("express"); // import express module
const apiRoutes = require("./routes/notes"); //import route handlers
const htmlRoutes = require("./routes/html");

const app = express(); //create express app
const PORT = process.env.PORT || 3001; //set port

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

//routes
app.use("/api/notes", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`App listeniong at http://localhost:${PORT}`); //Server starting confirmation
})
