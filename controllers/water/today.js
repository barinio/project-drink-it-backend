const { HttpError } = require('../../helpers');
const { Water } = require('../../models/waterModel');


const listWaterToday = async (req, res) => {
	const { _id: owner } = req.user;
	const { date } = req.query;
	const newDate = new Date(date).toDateString();

	const filter = { owner, date: newDate };

	if (!date) {
		throw HttpError(400, 'Bad Request');
	}

	const water = await Water.find(filter)
	// if (water.length === 0) {
	// 	throw HttpError(404, 'Not found');

	// }
	res.json(water);


};

module.exports = listWaterToday;
