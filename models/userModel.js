const { model, Schema } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailReg = /^\S+@\S+\.\S+$/;
// const dateRegexp = /^\d{2}-d{2}-\d{4}/;

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, 'Set password for user'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		token: {
			type: String,
			default: '',
		},
		avatarURL: {
			type: String,
			required: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, 'Verify token is required'],
		},
	},
	{ versionKey: false }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
	password: Joi.string().min(6).required(),
});
const emailSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
});
const loginSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
	password: Joi.string().min(6).required(),
});

const schemas = { registerSchema, loginSchema, emailSchema };

const User = model('users', userSchema);

module.exports = { User, schemas };
