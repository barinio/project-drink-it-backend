// const { default: mongoose } = require('mongoose');
const { HttpError } = require('../../helpers');
const { Water } = require('../../models');

const listWaterMonth = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { date } = req.query;

	const d = new Date(date);
	const updtoday = new Date();
	updtoday.setUTCHours(0, 0, 0, 0);

	const updtodaynorma = updtoday.toISOString();
	const filter = { owner, date: updtodaynorma };
	console.log(filter);
	await Water.findOneAndUpdate(filter, { dailyNorma: dailyNorma }, { new: true });



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

	const last = lastDay(month, year);

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


	const ARR = monthlyResults;
	const newARR = [];

	for (let i = 1; i <= last; i = i + 1) {
		if (i < 10) {
			const d = new Date(`${year}-0${month + 1}-0${i}`);

			const found = await ARR.find((element) => Date.parse(element._id) === Date.parse(d));
			if (!found) {
				newARR.push({
					_id: d,
					drankWater: 0,
					perDay: 0,
					dailyNorma: dailyNorma,
					persent: 0,
				})
			} else
				newARR.push(found);
		} else {
			const d = new Date(`${year}-0${month + 1}-${i}`);

			const found = await ARR.find((element) => Date.parse(element._id) === Date.parse(d));
			if (!found) {
				newARR.push({
					_id: d,
					drankWater: 0,
					perDay: 0,
					dailyNorma: dailyNorma,
					persent: 0,
				})
			} else
				newARR.push(found);

		}

	}
	res.json(newARR);
};

module.exports = listWaterMonth;
