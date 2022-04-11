//this returts us a function that we store in 'express' constant
const express = require("express");
const db = require("./db");

// importing the exported functions from db.js
const { connectToDb, getDb } = require("./db");

//init app & middleware
//to initialize the express app we have to invoke this 'express' function.
const app = express();

//db connection
//we want to connect to the mongodb database right away before we started listening for requests to this api. When we call our first function for inital connection we need to pass argument, that we called as 'callback' in db.js.
let db;
connectToDb((err) => {
  if (!err) {
    //set listen port for our express app.
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
    //getDb() returs us the database connection object that we need, and we store it in 'db', now we can interact with  database via 'db' const.
    db = getDb();
  }
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
