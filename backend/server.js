var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var cors = require('cors');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

// var Location = require('./models/newLocation');
var User = require('./models/User.server.model.js');

mongoose.connect('mongodb://localhost/readyCenter');

passport.use(new LocalStrategy({
	usernameField: 'email'
}, function(email, password, done) {
	//define how we match user credentials to db values
	User.findOne({ email: email }, function(err, user){
		if (!user) {
			done(new Error("This user does not exist :)"));
		}
		user.verifyPassword(password).then(function(doesMatch) {
			if (doesMatch) {
				done(null, user);
			}
			else {
				done(new Error("Please verify your password and try again :)"));
			}
		});
	});
}));

// passport.use(new TwitterStrategy({
// 	consumerKey: 'qgT3gYCqZCTbyL5EVzcOMVL8R',
// 	consumerSecret: 'Qkp6wOagy4pnC87kjBlwEAbFQstLrlFADvpitZ4tYNdc9UjE7G',
// 	callbackUrl: 'http://localhost:8080/api/auth/twitter/callback'
// }, function(token, tokenSecret, profile, done) {
// 	console.log(profile);
// 	User.findOne({ 'twitter.id': profile.id }, function(err, user){
// 		if (!user) {
// 			var user = new User();
// 			user.name = profile.displayName;
// 			user.twitter.id = profile.id;
// 			user.twitter.token = token;
// 			user.twitter.tokenSecret = tokenSecret;
// 			user.save(function(err, new_user) {
// 				if (err) {
// 					console.log("can't create user", err);
// 				}
// 				done(null, new_user);
// 			});
// 		}
// 		//check to see if token/tokenSecret have changed and save if necessary
// 		done(null, user);
// 	});
// }));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).end();
	}
	console.log(req.user);
	next();
};

// if we stored "is_admin" on the user model, we could also limit access to endpoints for admin only
// var requireAdmin = function(req, res, next) {
// 	if (!req.user.is_admin) {
// 		return res.status(401).end();
// 	}
// 	next();
// }

var app = express();
app.use(session({secret: 'fav locations are awesome', cookie: { maxAge: 60000 }}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
})
//****Register*****************************************************
app.post('/api/users', function(req, res) {
	console.log(req.body);
	User.findOne({ email: req.body.email }).exec().then(function(user) {
		//if we found a user, it's a duplicate
		if (user) {
			return res.status(400).json({message: "User with this email already exists :)"});

		}
		//if the user's password is too short ...
		if (req.body.password.length <= 6) {
			return res.status(400).json({message: "Your password must be longer than six characters :)"});
		}
		//otherwise, create the user
		var user = new User(req.body);
		user.save(function(err, new_user) {
			if (err) {
				console.log("can't create user", err);
			}
			res.json(new_user);
		});
	})
});
//****Login********************************************************
app.post('/api/users/auth', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
	return res.json({message: "you logged in"});
});
//****Twitter Auth*************************************************
app.get('/api/auth/twitter', passport.authenticate('twitter'));
app.get('/api/auth/twitter/callback', passport.authenticate('twitter', { 
	failureRedirect: '/#login', 
	successRedirect: '/#locations' 
}));
//****Logout********************************************************
app.get('/api/auth/logout', function(req, res) {
	req.logout();
	return res.redirect('/#login');
});
//****Post Location***********************************
app.post('/api/users/me/favorite_locations', requireAuth, function(req, res) {
	//grab the location
	Location.findOne({ _id: req.body._id }).exec().then(function(location) {
		if (!location) {
			return res.status(404).end();
		}
		//update the user with the favorite_location
		User.findOne({ _id: req.user._id }).exec().then(function(user) {
			user.lcations.push(location);
			user.save(function(err) {
				if (err) {
					console.log("can't add location to user");
				}
				return res.json(user);
			});
		});
	});
});
//****Get Users locations******************************
app.get('/api/users/me', requireAuth, function(req, res) {
	User
	.findOne({_id: req.user.id})
	.populate('favorite_locations')
	.exec().then(function(user) {
		return res.json(user);
	});
});
//****Get Users Items***********************************
app.get('/api/users', requireAuth, function(req, res) {
	User
	.find()
	.populate('favorite_locations')
	.exec().then(function(users) {
		return res.json(users);
	});
});
//****Delete User****************************************
app.delete('/api/users/:userId', requireAuth, function(req, res) {
	User.remove({ _id: req.params.userId }, function(err) {
		if (err) {
			console.log("can't delete user", err);
		}
		res.status(200).end();
	});
});
//****Post New Location**********************************
app.post('/api/locations', requireAuth, function(req, res) {
	var location = new location(req.body);
	location.save(function(err, new_location) {
		if (err) {
			console.log("can't create location", err);
		}
		res.json(new_location);
	});
});

app.get('/api/locations', requireAuth, function(req, res) {
	location
	.find()
	.sort('state')
	.limit(10)
	.skip(req.query.skip || 0)
	.exec().then(function(locations) {
		return res.json(locations);
	});
});

app.put('/api/locations/:locationId', requireAuth, function(req, res) {
	location.update(req.body, function(err) {
		if (err) {
			console.log("can't update location", err);
		}
		return res.json(req.body);
	});
});

app.delete('/api/locations/:locationId', requireAuth, function(req, res) {
	location.remove({ _id: req.params.locationId }, function(err) {
		if (err) {
			console.log("can't delete location", err);
		}
		res.status(200).end();
	});
});

var server = app.listen(3000, function(){
	console.log('api listening on', server.address().port);
})
