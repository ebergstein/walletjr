var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var User = mongoose.model('User')
module.exports = {

	register: (req, res) => {
		console.log("in");
		User.findOne({address: req.body.address}, (err, user) =>{
			if(err){
				//console.log(err);
				let errors = "";
				for (let i in err.errors){
					errors+=err.errors[i].message + ",";
				}
				return res.status(500).send(errors)
			}
			else if(user == null){
				let newUser = new User(req.body);
				bcrypt.hash(newUser.password, SALT_WORK_FACTOR, function(err, hash){
					if(err){
						let errors = "";
						for (let i in err.errors){
							errors+=err.errors[i].message + ",";
						}
						return res.status(500).send(errors)
					}
					else{
						newUser.password = hash
						newUser.save( (err, savedUser) => {
							//console.log("save");
							console.log(err);
							if(err){
								//console.log("bad");
								//console.log(err);
								let errors = "";
								for (let i in err.errors){
									errors+=err.errors[i].message + ",";
								}
								return res.status(500).send(errors)
							}
							else{
								req.session.user = savedUser;
								//console.log(savedUser);
								return res.json(savedUser);
							}
						})
					}
				})
			}
			else{
				let errors = "Address already in use.";
				return res.status(500).send(errors)
			}
		})
	},
	
	login: (req, res) => {
		//console.log("in");
		User.findOne({address: req.body.address}, (err, user) =>{
			//console.log(user);
			if(err){
				//console.log(err);
				let errors = "";
				for (let i in err.errors){
					errors+=err.errors[i].message + ",";
				}
				return res.status(500).send(errors)
			}
			else if(user == null){
				let errors = "User not found.";
				return res.status(500).send(errors)
			}
			else{
				//console.log(check.password)
				//console.log(req.body.password)
				bcrypt.compare(req.body.password, check.password, function(error, result){
					if(error){
						//console.log(err);
						let errors = "";
						for (let i in error.errors){
							errors+=error.errors[i].message + ",";
						}
						return res.status(500).send(errors)
					}
					else if(result == false){
						let errors = "Wrong Password.";
						return res.status(500).send(errors)
					}
					else{
						req.session.user = check;
						//console.log(user);
						return res.json(check);
					}
				})
			}
		})
	},
	
	logout: (req, res) => {
		req.session.destroy();
		res.redirect('/');
	},
	
	current: (req, res) => {
		//console.log("current");
		if(!req.session.user){
			return res.status(401).send("");
		}
		else{
			return res.json(req.session.user);
		}
	},
}