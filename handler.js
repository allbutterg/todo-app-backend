'use strict';

const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/tasks', function (req, res) {
  res.json ({
   message: 
   [
    {
        id: 1,
        category: "Personal",
        description: "Complete TR homework",
        priority: 1,
        goaldate: "19/03/20",
        completed: false
    },

    {
        id: 2,
        category: "Personal",
        description: "Renew Driving Licence",
        priority: 1,
        goaldate: "16/02/20",
        completed: false
    },

    {
        id: 3,
        category: "Personal",
        description: "Book theatre tickets",
        priority: 2,
        goaldate: "29/02/20",
        completed: false
    }

]
});
});

module.exports.tasks = serverless(app);

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
