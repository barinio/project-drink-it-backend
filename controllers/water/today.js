const { Water } = require('../../models/waterModel');

const listWaterToday = async (req, res) => {
	const { _id: owner } = req.user;
	const { date } = req.body;

	const filter = { owner, date: date };

	const water = await Water.find(filter);

	const total = await Water.countDocuments(filter);

	const persent = await Water.aggregate([
		{
			$match: { date: date }
		},
		{
			$group: { _id: '$owner', totalper: { $sum: "$persentWater" } },
		}
	]);
	console.log(persent);
	if (!persent.length) {
		res.json({
			water,
			total,
			persent: 0,
		});
	}

	res.json({
		water,
		total,
		persent: persent[0].totalper,
	});
};

module.exports = listWaterToday;
