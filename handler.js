'use strict';

const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/tasks', function (request, response) {
  res.send('Hello World!')
})

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
};
