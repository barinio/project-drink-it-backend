const { model, Schema } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const waterSchema = new Schema(
	{
		waterRate: {
			type: Number,
		},
		waterVolume: {
			type: Number,
		},
		date: {
			type: Date,
		},
		time: {
			type: String,
		}
		// owner: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: 'user',
		// 	required: true,
		// },
	},

	{ versionKey: false, timestamps: true }
);

waterSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
	waterRate: Joi.number().min(1).max(15000).required(),
	waterVolume: Joi.number().min(1).max(5000).required(),
	date: Joi.date().required(),

});

// const updStutusSchema = Joi.object({
// 	favorite: Joi.boolean().required(),
// }).messages({
// 	'any.required': 'missing field favorite',
// });

const schemas = { addSchema };

const Water = model('water', waterSchema);

module.exports = { Water, schemas };
