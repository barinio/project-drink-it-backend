const { HttpError } = require('../../helpers');
const { Water } = require('../../models/waterModel');


const listWaterToday = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { date } = req.query;

	const d = new Date(date);

	d.setUTCHours(0, 0, 0, 0);
	const newDate = d.toISOString();



	const filter = { owner, date: newDate };

	if (!date) {
		throw HttpError(400, 'Bad Request');
	}

	const water = await Water.find(filter)
	if (water.length === 0) {
		const newDay = await Water.create({
			owner,
			date: newDate,
			dailyNorma,
			drankWater: 0,
			perDay: 0,
			waterlist: [],
		});
		res.status(200).json(newDay);
	}
	else {
		res.json(water);
	}

};

module.exports = listWaterToday;
