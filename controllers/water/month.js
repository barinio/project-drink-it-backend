const { HttpError } = require('../../helpers');
const { Water } = require('../../models');

const listWaterMonth = async (req, res) => {

	const { date } = req.query;

	if (!date) {
		throw HttpError(400, 'Bad Request');
	}
	const newDate = new Date(date)
	const month = newDate.getUTCMonth(date);
	const year = newDate.getFullYear(date);


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
									new Date(`${year}-0${month + 1}-01`)
								]
							},
							{
								$lt: [
									{
										$toDate: "$date"
									},
									new Date(`${year}-0${month + 1}-31`)
								]
							}
						]
					}
				}
			},
			{
				$group: {
					_id: '$date', drankWater: { $first: "$drankWater" }, perDay: { $first: "$perDay" }, dailyNorma: { $first: "$dailyNorma" }
				},
			},
			{
				$project: {
					drankWater: "$drankWater",
					perDay: "$perDay",
					dailyNorma: "$dailyNorma",
					persent: { $divide: ["$drankWater", "$dailyNorma"] }
				}
			}
		])


	res.json(monthlyResults);
};

module.exports = listWaterMonth;
