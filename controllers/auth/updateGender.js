const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateGender = async (req, res) => {
	const { id } = req.params;
	const updatedGender = await User.findByIdAndUpdate(id, req.body, { new: true });
	if (!updatedGender) {
		throw HttpError(404, 'Not found');
	}
	res.json(updatedGender);
};

module.exports = updateGender;
