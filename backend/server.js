const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("cors")());
//new code below!!!
const passport = require("passport");

mongoose.connect("mongodb+srv://cervantes:Peluche1084@clusters.bye4z.mongodb.net/userdata", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true})
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// new code !!
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
//end of new code
app.listen(5000,function() {
    console.log("Connected Success");
})
console.log(mongoose.connection.readyState)
