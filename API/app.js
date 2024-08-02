const express = require('express');     //framework of node.js
 const router = require('./routes');
 const bodyParser = require('body-parser')     //midelware(cliend side se http request handl krne ke liye )
const cors  = require('cors');
const mongoose = require('mongoose');          //framework of mongodb
const app = express();
const port = 5000;
const { MongoClient } = require('mongodb');          //library of mongodb
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({"extended":true})) 
app.use(cors())
app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/HRMS', {      //HUMAN RESOURCE MANAGEMENT SYSTEM
  useNewUrlParser: true,  
  serverSelectionTimeoutMS: 30000, // Set a higher timeout value (e.g., 30 seconds)
});

app.listen(port, () => {                 //jis port me run krege
   console.log(`Example app listening at http://localhost:${port}`)
})



