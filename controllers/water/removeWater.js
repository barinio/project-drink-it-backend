const { Water } = require('../../models/waterModel');
const { HttpError } = require('../../helpers');

const removeWater = async (req, res) => {
	const { id } = req.params;
	const removeWater = await Water.findByIdAndDelete(id);
	if (!removeWater) {
		throw HttpError(404, 'Not found');
	}
	res.json({ message: 'deleted' });
};

module.exports = removeWater;
