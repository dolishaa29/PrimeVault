const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./db/dbconnection");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set the view engine to "ejs"
app.set("view engine", "ejs");

app.use("", require("./src/routers/router"));


// Set the views directory
 app.set("views", path.join(__dirname, "src/views"));

 connectDB();

// Start the server on port 4000
const PORT = 1023;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle potential errors during server startup
app.on("error", (error) => {
  console.error(`Server startup error: ${error.message}`);
});
