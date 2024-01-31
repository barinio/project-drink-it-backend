const { Water } = require('../../models');
const { HttpError } = require('../../helpers');
const { validateID } = require('../../service/waterServices/uuidValid');

const editWater = async (req, res) => {
	const { _id } = req.query;
	const { id } = req.params;

	const validid = validateID(_id);

	const { time, waterVolume } = req.body;

	const { waterlist } = await Water.findById(id);
	const persentWateronid = waterlist.find(keys => keys.id === _id);


	const edit = await Water.findOneAndUpdate({ _id: id, "waterlist.id": _id },
		{
			$inc: { drankWater: -persentWateronid.waterVolume + waterVolume, perDay: -1 },
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
	});
};

module.exports = editWater;

