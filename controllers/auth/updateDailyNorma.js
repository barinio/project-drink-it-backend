const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateDailyNorma = async (req, res) => {
	const { _id } = req.user;
	const updatedDailyNorma = await User.findByIdAndUpdate(_id, req.body, { new: true });
	if (!updatedDailyNorma) {
		throw HttpError(404, 'Not found');
	}
	res.json(updatedDailyNorma);
};

module.exports = updateDailyNorma;