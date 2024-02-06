const { model, Schema } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailReg = /^\S+@\S+\.\S+$/;
const genderList = ['woman', 'man'];

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
			match: emailReg,
		},
		token: {
			type: String,
			default: '',
		},
		avatarURL: {
			type: String,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, 'Verify token is required'],
		},
		userName: {
			type: String,
			default: '',
		},
		gender: {
			type: String,
			enum: genderList,
			default: 'woman',
		},
		weight: {
			type: Number,
			default: 0,
		},
		activityTime: {
			type: Number,
			default: 0,
		},
		willDrink: {
			type: Number,
			default: 0,
		},
		dailyNorma: {
			type: Number,
			default: 2000,
		},

		outdatedPassword: {
			type: String,
		},
		newPassword: {
			type: String,
		},
	},
	{ versionKey: false }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required().empty(false).messages({
		'string.base': 'The email must be a string.',
		'any.required': 'The email field is required.',
		'string.empty': 'The email must not be empty.',
		'string.patter.base': 'The email must be in format test@gmail.com.',
	}),
	password: Joi.string().min(8).max(64).required(),
});
const emailSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
});
const loginSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
	password: Joi.string().min(8).max(64).required(),
});

const updateUserSchema = Joi.object({
	avatarURL: Joi.string(),
	gender: Joi.string().valid(...genderList),
	userName: Joi.string(),
	email: Joi.string().pattern(emailReg),
	outdatedPassword: Joi.string().min(8).max(64),
	newPassword: Joi.string().min(8).max(64),
});

// !!!
const updateDailyNormaSchema = Joi.object({
	dailyNorma: Joi.number().max(15000),
	gender: Joi.string().valid(...genderList),
	weight: Joi.number(),
	activityTime: Joi.number(),
	willDrink: Joi.number(),
});

const schemas = {
	registerSchema,
	loginSchema,
	emailSchema,
	updateUserSchema,
	updateDailyNormaSchema,
};

const User = model('user', userSchema);

module.exports = { User, schemas };
