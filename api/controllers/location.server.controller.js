var foodItem = require('../models/food.server.model.js');
var newLocation = require('../models/location.server.model.js');

// exports.create = function(req, res) {
// 	var newLocation =  
// }


module.exports = {
	list: function(req, res) {
		location.find({ user: req.user._id }).select('_id name').exec().then(function(locations) {
			return res.json(locations);
		});
	},	
	
	listOne: function(req, res) {
		location
			.findById(req.params.id)
			.populate('user', 'email')
			.populate('criteria')
			.exec()
			.then(function(location){
				res.status(200).json(location);
			}, function(err){
				res.status(500).json(err);
		});
	},	

	create: function(req, res) {
		console.log(req.body);
		var newLoc = new newLocation(req.body);
		// newLoc.user = req.user._id;
		newLoc.save(function(err, location) {
			if (err) {
				console.log(err)
				return res.status(500).end();
			}
			return res.json(location);
		});
	},
	update: function(req, res) {
		location
		.findByIdAndUpdate(req.params.locationId, {name: req.body.name})
		.exec(function(err, result) {
			console.log(result)
			if(err) return res.status(500).end();
			return res.status(200).json(result);
		});
	},
	delete: function(req, res) {
		location
		.findById(reqkb.params.locationId)
		.remove()
		.exec(function(err, result) {
			console.log(result)
			if(err) return res.status(500).end();
			return res.status(200).json(result);
		});
	}
}

