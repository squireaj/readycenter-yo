var mongoose = require('mongoose');

var gearSchema = new mongoose.Schema({
	"owner": String,
	"location": String,
	"item" : String,
	"count" : Number
});

module.exports = mongoose.model('gearItem', gearSchema);