var mongoose = require('mongoose');
var foodItem = require('./food.server.model.js');
var gearItem = require('./gear.server.model.js');

var locationSchema = new mongoose.Schema({
	"owner": String,
	"locationTitle": String,
	"foodItems": [{type: mongoose.Schema.Types.ObjectId, ref: 'foodItem'}],
	"gearItems": [{type: mongoose.Schema.Types.ObjectId, ref: 'gearItem'}],
	"userId" : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	// "subLocations": [newLocation] 
});

module.exports = mongoose.model('newLocation', locationSchema);propTypes: {
        title: React.PropTypes.number.isRequired
      },	