const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateDailyNorma = async (req, res) => {
	const { id } = req.params;
	const updatedDailyNorma = await User.findByIdAndUpdate(id, req.body, { new: true });
	if (!updatedDailyNorma) {
		throw HttpError(404, 'Not found');
	}
	res.json(updatedDailyNorma);
};

module.exports = updateDailyNorma;