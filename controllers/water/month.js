// const { default: mongoose } = require('mongoose');
const { HttpError } = require('../../helpers');
const { Water } = require('../../models');

const listWaterMonth = async (req, res) => {
	const { _id: owner } = req.user;
	console.log(owner);
	const { date } = req.query;

	const d = new Date(date);


	const month = d.getMonth(date);
	const year = d.getFullYear(date);

	const dateAt = new Date(`${year}-0${month + 1}-01`);
	dateAt.toISOString();


	const dateTo = new Date(`${year}-0${month + 1}-29`)
	dateTo.toISOString();


	if (!date) {
		throw HttpError(400, 'Bad Request');
	}



	const monthlyResults = await Water.aggregate(
		[
			{
				$match: {
					"owner": owner,
					$expr: {
						$and: [
							{
								$gte: [
									{
										$toDate: "$date"
									},
									dateAt
								]
							},
							{
								$lte: [
									{
										$toDate: "$date"
									},
									dateTo
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
