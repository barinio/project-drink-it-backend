const { Water } = require('../../models');
const { HttpError } = require('../../helpers');
const { validateID } = require('../../service/waterServices/uuidValid');

const editWater = async (req, res) => {
	const { portionID } = req.query;
	const { todayID } = req.params;

	const validid = validateID(portionID);

	const { time, waterVolume } = req.body;

	const { waterlist } = await Water.findById(todayID);
	const persentWateronid = waterlist.find(keys => keys.id === portionID);


	const edit = await Water.findOneAndUpdate({ _id: todayID, "waterlist.id": portionID },
		{
			$inc: { drankWater: -persentWateronid.waterVolume + waterVolume },
			$set: { "waterlist.$.waterVolume": waterVolume, "waterlist.$.time": time }
		}, { new: true }
	);


	if (!edit || !validid) {
		throw HttpError(404, 'Not found');
	}
	res.status(200).json({
		status: "success",
		waterVolume,
		time,
		id: portionID,
	});
};

module.exports = editWater;

