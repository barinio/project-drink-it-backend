// const { default: mongoose } = require('mongoose');
const { HttpError } = require('../../helpers');
const { Water } = require('../../models');
const { lastDay } = require('../../service/waterServices/lastDayMonth');
const { newDate } = require('../../service/waterServices/newDate');
const { resultMonthArray } = require('../../service/waterServices/resultMonthArray');

const listWaterMonth = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { date } = req.query;

	const d = new Date(date);


	const updtodaynorma = newDate();
	const filter = { owner, date: updtodaynorma };
	await Water.findOneAndUpdate(filter, { dailyNorma: dailyNorma }, { new: true });


	const month = d.getMonth(date);
	const year = d.getFullYear(date);

	const last = lastDay(month, year);

	const dateAt = new Date(`${year}-0${month + 1}-01`);
	dateAt.toISOString();

	const dateTo = new Date(`${year}-0${month + 1}-${lastDay(month, year)}`)
	dateTo.toDateString()


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
			{
				$sort: { "_id": 1 }
			}
		])

	const newARR = resultMonthArray(monthlyResults, dailyNorma, last, year, month);
	res.json(newARR);
}


module.exports = listWaterMonth;
