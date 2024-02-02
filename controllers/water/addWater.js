
const { Water } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const addWater = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { waterVolume, time } = req.body;

	const userDailyNorma = dailyNorma > 0 ? dailyNorma : 2000;
	const d = new Date();

	d.setUTCHours(0, 0, 0, 0);
	const date = d.toISOString();

	const id = uuidv4();


	const filter = { owner, date: date };

	const searchfordate = await Water.findOne(filter);
	if (!searchfordate) {

		await Water.create({
			owner,
			date,
			dailyNorma: userDailyNorma,
			drankWater: waterVolume,
			perDay: +1,
			waterlist: [{ waterVolume: waterVolume, time: time, id }],
		});

		res.status(201).json({
			status: "success",
			waterVolume,
			time,
			id,

		});

	} else {

		await Water.findOneAndUpdate(filter,
			{
				$inc: { perDay: +1, drankWater: +waterVolume },
				$push: { waterlist: { waterVolume: waterVolume, time: time, id } },
			},
			{ new: true })

		res.status(201).json({
			status: "success",
			waterVolume,
			time,
			id,
		});
	}
};

module.exports = addWater;
