// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
const cors = require('cors')
var config = require('./config/index');
// initialize our express app
mongoose.connect('mongodb://localhost:27017/ks_system_test', {useNewUrlParser: true});

const user = require('./routes/user'); // Imports routes for the products
const complaint = require('./routes/complaint'); // Imports routes for the products

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// Check Middle ware For Authentication.......
let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
             status:404, 
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        status:404, 
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };


  
app.use('/', user);
app.use('/', checkToken,complaint);

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});