var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
	"owner": String,
	"location": String,
	"item" : String,
	"count" : Number,
	"exDate": {type: Date }, 
	"unit" : {type: String, enum:[
		'lb',
		'kg',
		'l',
		'qt',
		'pt',
		'oz',
		'gal',
		'units'
	]},
});

module.exports = mongoose.model('foodItem', foodSchema);