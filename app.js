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

//nodemon app     to run express app
//nodemon ----- is a tool that helps develop node. js based applications by automatically restarting the node application when file changes in the directory are detected

//then go to http://localhost:3000/books , since we defined welcome message for '/books' route

//INSTALLING mongodb driver for node.js app, run:
// npm install mongodb
