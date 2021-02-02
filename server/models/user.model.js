const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"]
	},
	email : {
		type: String ,
		required: [true, 'Email address is required']
	},
	password : {
		type: String ,
		required : [true, "Password is required"],
		minlength: [8, "Password must be at least 8 characaters"]
	}
	},{timestamps: true}
);

UserSchema.virtual("confirmPassword")
	.get(() => this._confirmPassword)
	.set(value => (this._confirmPassword = value));

UserSchema.pre("validate", (next) => {
	if (this.password !== this.confirmPassword) {
		this.invalidate("confirmPassword", "Password must match confirm password!")
	}
	next();
});

UserSchema.pre("save" , (next) => {
	bcrypt
	.hash(this.password, 10)
	.then(hash => {
		this.password = hash;
		next();
	});
});

const User = mongoose.model("User", UserSchema);

module.exports = User;