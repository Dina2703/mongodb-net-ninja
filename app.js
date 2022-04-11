//this returts us a function that we store in 'express' constant
const express = require("express");
const { ObjectId } = require("mongodb");

// importing the exported functions from db.js
const { connectToDb, getDb } = require("./db");

//init app & middleware
//to initialize the express app we have to invoke this 'express' function.
const app = express();

//db connection
//we want to connect to the mongodb database right away before we started listening for requests to this api. When we call our first function for inital connection we need to pass argument, that we called as 'cb' in db.js.
let db;
connectToDb((err) => {
  if (!err) {
    //set listen port for our express app.
    app.listen("3000", () => {
      console.log("app listening on port 3000");
    });
    //getDb() returs us the database connection object that we need, and we store it in 'db', now we can interact with  database via 'db' const.
    db = getDb();
  }
});

//routes
// to handle GET request
app.get("/books", (req, res) => {
  let books = []; //create an array named books

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book) => books.push(book)) //each time around push each book to our new array 'books'. It's an async function, it returns promise. we can tack on a then() when the task is complete.
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

//Fetching single document. :id - is for dynamic id parameters. Using dynamic routes allows us to pass parameters to the route and process based on them. And req.params.id - helps to access the route parameter value
app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid doc id" });
  }
});

//.find() methods returns a cursor object that point to a set of documents outlined by our query. find() method with empty argument points to the whole collection, but if we add filter as an argument it's going to point to a subset of documents based on that filter.
//To get the documents we can use methods like toArray(), forEach().
//toArray() fetches all the documents that the cursor points to and it puts them into an array for us.
//forEach() iterates the document one at a time and then allows us to precess each one individually.

//nodemon app     to run express app
//nodemon ----- is a tool that helps develop node. js based applications by automatically restarting the node application when file changes in the directory are detected

//then go to http://localhost:3000/books , since we defined welcome message for '/books' route

//INSTALLING mongodb driver for node.js app, run:
// npm install mongodb
