
const { Water } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const addWater = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { waterVolume, time } = req.body;

	const date = new Date().toDateString();
	const id = uuidv4();
	// console.log(id);

	const filter = { owner, date: date };

	const searchfordate = await Water.findOne(filter);
	if (!searchfordate) {

		await Water.create({
			owner,
			date,
			dailyNorma,
			drankWater: waterVolume,
			perDay: +1,
			waterlist: [{ waterVolume: waterVolume, time: time, id }],
		});

		res.status(201).json({
			status: "success",

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
