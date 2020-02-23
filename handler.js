'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});

// Retrieving tasks

app.get('/task', function (req, res) {

  connection.query('SELECT * FROM `task` WHERE `categoryId` = "2"', function (error, results, fields) {
    // error will be an Error if one occurred during the query
    if (error) {
      console.error("Your query had a problem with retrieving tasks", error);
      res.status(500).json({ errorMessage: error });
    }
    else {
      // Query was successful
      res.json({ tasks: results });
    }
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });

});


// Creating tasks
app.post('/task', function (req, res) {
  res.json({
    message: 'Gauri, your POST works!',
  });
});

// Updating tasks
app.put('/task/:taskId', function (req, res) {
  res.json({
    message: 'Gauri, your PUT works!',
  });
});


// Deleting tasks
app.delete('/task/:taskId', function (req, res) {
  res.json({
    message: 'Gauri, your DELETE works!',
  });
});


module.exports.task = serverless(app);

// module.exports.tasks = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Gauri, your API works!'
//       },
//       null,
//       2
//     ),
//   };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
