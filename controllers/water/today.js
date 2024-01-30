const { Water } = require('../../models/waterModel');

const listWaterToday = async (req, res) => {
	const { _id: owner } = req.user;
	const { date } = req.query;


	const filter = { owner, date: date };

	const water = await Water.find(filter)



	res.json(water);
};

module.exports = listWaterToday;
