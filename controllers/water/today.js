const { HttpError } = require('../../helpers');
const { Water } = require('../../models/waterModel');

const listWaterToday = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { date } = req.query;

	const userDailyNorma = dailyNorma > 0 ? dailyNorma : 2000;

	const d = new Date(date);

	d.setUTCHours(0, 0, 0, 0);
	const newDate = d.toISOString();

	const filter = { owner, date: newDate };

	if (!date) {
		throw HttpError(400, 'Bad Request');
	}

	const water = await Water.findOneAndUpdate(filter, { dailyNorma: dailyNorma }, { new: true });

	if (water === null) {
		const newDay = await Water.create({
			owner,
			date: newDate,
			dailyNorma: userDailyNorma,
			drankWater: 0,
			perDay: 0,
			waterlist: [],
		});
		res.status(200).json(newDay);
	} else {
		res.json(water);
	}
};

module.exports = listWaterToday;
