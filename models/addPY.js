var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var planYearSchema = new Schema({
  planYear: String,
  amount_flexed: Number
});

var planYearToDB =
mongoose.model('planYears', planYearSchema);
module.exports= planYearToDB;
