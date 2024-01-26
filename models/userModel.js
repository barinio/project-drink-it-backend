const { model, Schema } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailReg = /^\S+@\S+\.\S+$/;
// const dateRegexp = /^\d{2}-d{2}-\d{4}/;
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
		userName: {
			type: String,
			default: '',
		},
		gender: {
			type: String,
			enum: genderList,
			required: true,
		},

		dailyNorma: {
			type: Number,
			default: 0,
		},
		outdatedPassword: {
			type: String,
			required: [true, 'Set outdated password for user'],
		},
		newPassword: {
			type: String,
			required: [true, 'Set new password for user'],
		},
		repeatedNewPassword: {
			type: String,
			required: [true, 'Repeat new password for user'],
		},
	},
	{ versionKey: false }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
	password: Joi.string().min(8).max(64).required(),
});
const emailSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
});
const loginSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
	password: Joi.string().min(8).max(64).required(),
});

// const updatePassword = Joi.object({
// 	outdatedPassword: Joi.string().min(8).max(64).required(),
// 	newPassword: Joi.string().min(8).max(64).required(),
// 	repeatedNewPassword: Joi.string().min(8).max(64).required(),
// });

const updateGenderSchema = Joi.object({
	gender: Joi.string()
		.valid(...genderList)
		.required(),
});
const updateUserNameSchema = Joi.object({
	userName: Joi.string().required(),
});
const updateEmailSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
});

const updateDailyNorma = Joi.object({
	dailyNorma: Joi.number().required(),
});

const schemas = {
	registerSchema,
	loginSchema,
	emailSchema,
	updateGenderSchema,
	updateUserNameSchema,
	updateEmailSchema,
	updateDailyNorma,
};

const User = model('user', userSchema);

module.exports = { User, schemas };
