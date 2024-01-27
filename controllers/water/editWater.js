const { Water } = require('../../models');
const { HttpError } = require('../../helpers');

const editWater = async (req, res) => {
	const { id } = req.params;
	const { dailyNorma } = req.user;
	const { waterVolume } = req.body;
	const persentWater = (waterVolume / dailyNorma) * 100;


	const updatedWater = await Water.findByIdAndUpdate(id, {
		...req.body,
		persentWater,
	}
		, { new: true });
	if (!updatedWater) {
		throw HttpError(404, 'Not found');
	}
	res.json(updatedWater);
};

module.exports = editWater;
