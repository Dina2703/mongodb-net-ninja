//this returts us a function that we store in 'express' constant
const express = require("express");

//init app & middleware
//to initialize the express app we have to invoke this 'express' function.
const app = express();

//set listen port for our express app.
app.listen(3000, () => {
  console.log("app listening on port 3000");
});

//routes
// to handle GET request
app.get("/books", (req, res) => {
  res.json({ message: "Welcome to the api" });
});
