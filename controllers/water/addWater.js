const { Water } = require('../../models');
const { v4: uuidv4 } = require('uuid');

const addWater = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { waterVolume, time } = req.body;
	const date = new Date().toLocaleDateString();
	// const persentWater = (waterVolume / dailyNorma) * 100;

	const filter = { owner, date: date };

	const searchfordate = await Water.findOne(filter);
	if (!searchfordate) {
		const addNewWater = await Water.create({
			owner,
			date,
			dailyNorma,
			drankWater: waterVolume,
			perDay: 1,
			waterlist: [{ waterVolume: waterVolume, time: time, id: uuidv4() }],
		});
		res.status(201).json(addNewWater);
	} else {
		await Water.findOneAndUpdate(filter,
			{
				$inc: { perDay: +1, drankWater: +waterVolume },
				$push: { waterlist: { waterVolume: waterVolume, time: time, id: uuidv4() } },
			},
			{ new: true })

		res.status(201).json({
			status: "success",
			waterVolume,
			time
		});
	}
};

module.exports = addWater;
