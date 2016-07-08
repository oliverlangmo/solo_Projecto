var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expenseSchema = new Schema({
  planYear: String,
  description: String,
  amount: Number,
  date: String,
  receiptPic: String,
});

var expenseToDB =mongoose.model('expenses', expenseSchema);
module.exports= expenseToDB;
