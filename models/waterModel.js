const { model, Schema } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const waterSchema = new Schema(
	{
		dailyNorma: {
			type: Number,
		},
		date: {
			type: Date,
		},
		time: {
			type: String,
		},
		perDay: {
			type: Number
		},
		drankWater: {
			type: Number
		},
		waterlist: {
			type: Array
		}

		,
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			required: true,
		},
	},

	{ versionKey: false, timestamps: true }
);

waterSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
	waterVolume: Joi.number().min(1).max(5000).required(),
	time: Joi.string().required(),
});
// regex(/^([0-9]{2}):([0-9]{2})$/)


// const updStutusSchema = Joi.object({
// 	favorite: Joi.boolean().required(),
// }).messages({
// 	'any.required': 'missing field favorite',
// });

const schemas = { addSchema };

const Water = model('water', waterSchema);

module.exports = { Water, schemas };
