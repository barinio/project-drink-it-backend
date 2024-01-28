const { Water } = require('../../models');

const listWaterMonth = async (req, res) => {
	const { _id: owner, } = req.user;
	const { date } = req.body;



	const filter = {
		owner
	};

	const water = await Water.find(filter);
	const total = await Water.countDocuments(filter);
	const monthlyResults = await Water.aggregate([
		{
			$match: {
				owner: owner, "date": {
					$gte: new Date("01.01.2024"),
					$lte: new Date("30.01.2024")
				}
			},
		},
		{
			$group: {
				_id: '$date', totalper: { $sum: "$persentWater" }, totalWaterpe: { $sum: 1 }, daylyNorma: { $last: '$dailyNorma' }
			},
		}
	])

	res.json({
		// water,
		// total,
		monthlyResults,
		// persent: persent[0].totalper,
	});
};

module.exports = listWaterMonth;
