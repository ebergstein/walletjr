let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
	password: {type: String, required: [true, "You need to input your password."]},
	address: {type: String, required: [false]},
	rules: [{type: String, required: [false]}],
	kids: [{type: String, required: [false]}],
}, {timestamps:true});
mongoose.model('User', UserSchema)