//this file for database connection code
// we have 2 functions:
// 1 for initially connect to a database;
// another functione to retrieve  that database connection once we already have connected to it.

//to destructure the MongoClient object for us from mongodb package.
// MongoClient allows us to connect to a database. it takes first a connection string(special mongodb url for a database)
const { MongoClient } = require("mongodb");

// we can export these two functions and use them in our express app(app.js)
//"mongodb://localhost:27017/<your db name>"  this is a connection string for a local mongodb database.
module.exports = {
  //the first function to initially connect to database.This is an async function, since it takes some time to do, and it returns a promise.
  //client -- represents the client(obj) we've just created by connecting to the database. On the client object is a method called 'db' which returns to us in essence the database connection(interface through which we can interact with the database we're connected to).
  //client.db()  -- and we can store its value on 'dbConnection' const.
  connectToDb: (callback) => {
    MongoClient.connect("mongodb://localhost:27017/bookstore").then(
      ((client) => {
        const dbConnection = client.db();
        callback();
      }).catch((err) => {
        console.log(err);
        callback(err);
      })
    );
  },
  //the second function to return our database connection after we've connected to it. This database connection will allow us to communicate with the database.
  getDb: () => dbConnection,
};

//getDb() --- the main purpose of this function is return a value which is the database connection because that value will then be used to communicate with the database to do things like ADD, READ, REMOVE data ect

//callback = it's a callback function, that we can pass as argument, that we want to fire after we try to connect to the database.
