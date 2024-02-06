
const { Water } = require('../../models');
const { v4: uuidv4 } = require('uuid');
const { newDate } = require('../../service/waterServices/newDate');

const addWater = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { waterVolume, time } = req.body;

	const userDailyNorma = dailyNorma > 0 ? dailyNorma : 2000;

	const date = newDate();
	const portionID = uuidv4();


	const filter = { owner, date: date };

	const searchfordate = await Water.findOne(filter);
	if (!searchfordate) {

		await Water.create({
			owner,
			date,
			dailyNorma: userDailyNorma,
			drankWater: waterVolume,
			perDay: +1,
			waterlist: [{ waterVolume: waterVolume, time: time, id: portionID }],
		});

		res.status(201).json({
			status: "success",
			waterVolume,
			time,
			id: portionID,

		});

	} else {

		await Water.findOneAndUpdate(filter,
			{
				$inc: { perDay: +1, drankWater: +waterVolume },
				$push: { waterlist: { waterVolume: waterVolume, time: time, id: portionID } },
			},
			{ new: true })

		res.status(201).json({
			status: "success",
			waterVolume,
			time,
			id: portionID,
		});
	}
};

module.exports = addWater;
