'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
const uuidv4 = require('uuid/v4');
const mysql = require('mysql');
const cors = require('cors');
app.use(cors()); 

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});

// Retrieving tasks

app.get('/task', function (req, res) {

  connection.query('SELECT * FROM `task`', function (error, results, fields) {
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

  const taskToInsert = req.body;
  taskToInsert.taskId = uuidv4();

  connection.query('INSERT INTO `task` SET ?', taskToInsert, function (error, results, fields) {
    if (error) {
      console.error("Your query had a problem with inserting a new task", error);
      res.status(500).json({ errorMessage: error });
    }
    else {

      res.json({ tasks: results });
    }
 

  });
});

// Updating tasks
app.put('/task/:taskId', function (req, res) {

const taskToUpdate = [req.body.task, req.body.priority, req.body.goalDate, req.body.completion, req.body.categoryId, req.body.taskId];
const sql = 'UPDATE task SET description=?, priority=?, goalDate=?, completed=?, categoryId=? WHERE taskId=?'

connection.query(sql, taskToUpdate, function (error, results, fields) {
  if (error) {
    console.error("Your query had a problem with updating a task", error);
    res.status(500).json({ errorMessage: error });
  }
  else {
    res.json({ tasks: results});
  }

  // res.json({
  //   message: 'Gauri, your PUT works!',
  //   taskSaved: taskToUpdate
  });
});


// Deleting tasks
app.delete('/task/:taskId', function (req, res) {

  connection.query('DELETE FROM task WHERE taskId=?', [req.body.taskId], function (error, results, fields) {
    if (error) {
      console.error("Your query had a problem with deleting a task", error);
      res.status(500).json({ errorMessage: error });
    }
    else {
      res.json({ tasks: results});
    }
  
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
