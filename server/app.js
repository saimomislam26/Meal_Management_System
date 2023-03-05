const express = require('express');
const cookieParser = require('cookie-parser')
const userRouter = require('./Router/userRouter');
const mealRouter = require('./Router/mealRouter')
const bazarRouter = require('./Router/bazarRouter')
const cors = require("cors");
const app = express();
app.use(cookieParser());
app.use(express.json());


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // http://localhost:3000 
    res.setHeader('Access-Control-Allow-Origin', 'https://main--visionary-pastelito-6bff9d.netlify.app/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization','credentials');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(userRouter, cors())
app.use(bazarRouter, cors())
app.use(mealRouter, cors())

module.exports = app;