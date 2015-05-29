var foodItem = require('../models/food.server.model.js');

exports.create = function(req, res) {
	var newLocation =  
}



//mark controller example 

// var Project = require('../models/Project');

// module.exports = {
// 	list: function(req, res) {
// 		Project.find({ user: req.user._id }).select('_id name').exec().then(function(projects) {
// 			return res.json(projects);
// 		});
// 	},	
	
// 	listOne: function(req, res) {
// 		Project
// 			.findById(req.params.id)
// 			.populate('user', 'email')
// 			.populate('criteria')
// 			.exec()
// 			.then(function(project){
// 				res.status(200).json(project);
// 			}, function(err){
// 				res.status(500).json(err);
// 		});
// 	},	

// 	create: function(req, res) {
// 		var newProject = new Project(req.body);
// 		newProject.user = req.user._id;
// 		newProject.save(function(err, project) {
// 			if (err) {
// 				console.log(err)
// 				return res.status(500).end();
// 			}
// 			return res.json(project);
// 		});
// 	},
// 	update: function(req, res) {
// 		Project
// 		.findByIdAndUpdate(req.params.projectId, {name: req.body.name})
// 		.exec(function(err, result) {
// 			console.log(result)
// 			if(err) return res.status(500).end();
// 			return res.status(200).json(result);
// 		});
// 	},
// 	delete: function(req, res) {
// 		Project
// 		.findById(req.params.projectId)
// 		.remove()
// 		.exec(function(err, result) {
// 			console.log(result)
// 			if(err) return res.status(500).end();
// 			return res.status(200).json(result);
// 		});
// 	}
// }

