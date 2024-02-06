const { Water } = require('../../models/waterModel');
const { HttpError } = require('../../helpers');
const { validateID } = require('../../service/waterServices/uuidValid');

const removeWater = async (req, res) => {
	const { portionID } = req.query;
	const { todayID } = req.params;

	const validid = validateID(portionID);

	if (!validid) {
		throw HttpError(404, 'Not found');
	}

	const { waterlist } = await Water.findById(todayID);
	const persentWateronid = waterlist.find(keys => keys.id === portionID);


	if (!persentWateronid) {
		throw HttpError(404, 'Not found');
	}


	const removeWater = await Water.findByIdAndUpdate(todayID,
		{
			$inc: { drankWater: -persentWateronid.waterVolume, perDay: -1 },
			$pull: { waterlist: { id: portionID } },
		},

		{ new: true })


	if (!removeWater) {
		throw HttpError(404, 'Not found');
	}
	res.json({ message: 'deleted' });
};

module.exports = removeWater;
