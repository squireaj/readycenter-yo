var bcrypt = require('bcrypt-nodejs'); 
var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: String,
	locations: [{
		name: String,
		supplies: [{
			food: [{
				name: { type: String, required: true, min: 0, default: 0},
				createdAt: { type: Date, default: Date.now },
				quantity: { type: Number, default: 0 }
			}],
			gear: [{}],
			weapons: [{}]
		}]
	}]  
});

//api
// <input>data.name</input>
// data.type

// controller
// //make foodObj from models and from data returned from external api
// var foodObj = {
// 	name: '',
// 	type: '',
// 	quantity: 0
// }

// FoodService.postfood(foodObj).then(function)

// var postfood = function(foodObj){
// //$http({
// 	method: 'POST',
// 	url: '/api/user/items',
// 	data: {
// 		name: foodObj.name
// 		quantity: foodObj.quantity
// 	}
// })

// app.post('/api/user/items', function(req, res){
// 	User.findOrCreate({food, function(){
// 		name: req.body.name,
// 		quantity: req.body.quantity
// 	}})
// })

// UserSchema.methods.toJSON = function() {
// 	var user = this.toObject();
// 	delete user.password;

// 	return user;
// };

// UserSchema.methods.comparePasswords = function(password, callback) {
// 	bcrypt.compare(password, this.password, callback);
// }

// UserSchema.pre('save', function(next){
// 	var user = this;

// 	if(!user.isModified('password')) return next();

// 	bcrypt.genSalt(10, function(err, salt){
// 		if(err) return next(err);

// 		bcrypt.hash(user.password, salt, null, function(err, hash){
// 			if(err) return next(err);

// 			user.password = hash;
// 			next();
// 		})
// 	})

// })

// module.exports = mongoose.model('User', UserSchema);



