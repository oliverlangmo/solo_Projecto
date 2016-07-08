var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({extended:false});

app.listen(process.env.PORT||8080, function(req,res){
console.log('server listening on port 8080');
});
app.use(express.static('public'));
app.get('/', function(req,res){
  res.sendFile(path.resolve('public/views/index.html'));
});
var expenseToDB = require('../models/addExpense');
var mongoURI = "mongodb://localhost:27017/expense-tracker";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});
