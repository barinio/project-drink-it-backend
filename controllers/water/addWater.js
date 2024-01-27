const { Water } = require('../../models');

const addWater = async (req, res) => {
	const { _id: owner, dailyNorma } = req.user;
	const { waterVolume } = req.body;
	const date = new Date();
	const persentWater = (waterVolume / dailyNorma) * 100;


	const addNewWater = await Water.create({
		...req.body,
		owner,
		date,
		dailyNorma,
		perDay: 1,
		persentWater,
	});
	res.status(201).json(addNewWater);
};

module.exports = addWater;
