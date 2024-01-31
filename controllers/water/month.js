const { Water } = require('../../models');

const listWaterMonth = async (req, res) => {
	const { _id: owner } = req.user;
	// const { date } = req.query;
	console.log(owner);
	console.log(new Date("2024-01-01").toLocaleDateString());
	// const water = await Water.aggregate({ owner: owner })
	// const total = await Water.countDocuments(filter);

	const monthlyResults = await Water.aggregate(
		[
			// { $sort: { owner: owner } },
			{
				$match: {
					$expr: {
						$and: [
							{
								$gte: [
									{
										$toDate: "$date"
									},
									new Date("2024-01-27").toLocaleDateString()
								]
							},
							{
								$lt: [
									{
										$toDate: "$date"
									},
									new Date("2024-01-30").toLocaleDateString()
								]
							}
						]
					}
				}
			}])
	// { $sort: { type: -1 } }],
	// { hint: { qty: 1, category: 1 } })
	// 	{
	// 		$match: {
	// 			_id, date: {
	// 				$gte: new Date("01.01.2024").toLocaleDateString(),
	// 				$lte: new Date("30.01.2024").toLocaleDateString()
	// 			}
	// 		},
	// 	},
	// 	{
	// 		$group: {
	// 			_id: '$date', totalper: { $sum: "$persentWater" }, totalWaterpe: { $sum: 1 }, daylyNorma: { $last: '$dailyNorma' }
	// 		},
	// 	}
	// ])

	res.json(
		// water,
		// total,
		monthlyResults,
		// persent: persent[0].totalper,
	);
};

module.exports = listWaterMonth;
