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
var planYearToDB = require('../models/addPY');
var mongoURI = "mongodb://localhost:27017/expense-tracker";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});
app.post('/addExpense', function(req,res){
   console.log('hit post route with ' + req.body);
   var saveExpense= new expenseToDB ({
     planYear: req.body.planYear,
     description: req.body.description,
     amount:req.body.amount,
     date: req.body.date,
     receiptPic: req.body.receipt
   });
   saveExpense.save(function(err){
     if(err){
       console.log(err);
       res.sendStatus(500);
     }else{
       console.log('expense save complete');
       res.sendStatus(200);
     }
   });
 });
 app.post('/setPlanYear', function(req,res){
    console.log('hit post route with ' + req.body);
    var savePlanYear= new planYearToDB ({
      planYear: req.body.plan_year,
      amount_flexed:req.body.amount_flexed
    });
    savePlanYear.save(function(err){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        console.log('planYear save complete');
        res.sendStatus(200);
      }
    });
  });
 app.get('/getExpenses', function(req,res){
    console.log('hit the get route');
      expenseToDB.find()
      .then( function( data ){
        console.log(data);
        res.send( data );
      });
    });
    app.get('/getPlanInfo', function(req,res){
       console.log('hit the plan get route');
         planYearToDB.find()
         .then( function( data ){
           console.log(data);
           res.send( data );
         });
       });
