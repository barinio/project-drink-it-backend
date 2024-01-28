const { Water } = require('../../models/waterModel');
const { HttpError } = require('../../helpers');

const removeWater = async (req, res) => {
	const { _id } = req.query;
	const { id } = req.params;


	const { waterlist } = await Water.findById(id);
	const persentWateronid = waterlist.find(keys => keys.id === _id).persentWater;

	if (!persentWateronid) {
		throw HttpError(404, 'Not found');
	}


	const removeWater = await Water.findByIdAndUpdate(id,
		{
			$inc: { persent: -persentWateronid, perDay: -1 },
			$pull: { waterlist: { id: _id } },
		},

		{ new: true })
	if (!removeWater) {
		throw HttpError(404, 'Not found');
	}
	res.json({ message: 'deleted' });
};

module.exports = removeWater;
