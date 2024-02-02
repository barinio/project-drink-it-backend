// const { default: mongoose } = require('mongoose');
const { HttpError } = require('../../helpers');
const { Water } = require('../../models');

const listWaterMonth = async (req, res) => {
	const { _id: owner } = req.user;
	const { date } = req.query;

	const d = new Date(date);


	const month = d.getMonth(date);
	const year = d.getFullYear(date);


	const lastDay = (month, year) => {
		if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) return 31;
		if (month === 3 || month === 5 || month === 8 || month === 10) return 30;
		if (month === 1 && year % 4 === 0) return 29;
		if (month === 1 && year % 4 !== 0) return 28;
	}



	const dateAt = new Date(`${year}-0${month + 1}-01`);
	dateAt.toISOString();


	const dateTo = new Date(`${year}-0${month + 1}-${lastDay(month, year)}`)
	dateTo.toISOString();
	console.log(dateTo);

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
					persent: { $multiply: [{ $divide: ["$drankWater", "$dailyNorma"] }, 100] }
				}
			},
			// {
			// 	$sort{}
			// }
		])


	res.json(monthlyResults);
};

module.exports = listWaterMonth;
