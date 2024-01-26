const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateUserName = async (req, res) => {
	const { id } = req.params;
	const updatedUserName = await User.findByIdAndUpdate(id, req.body, { new: true });
	if (!updatedUserName) {
		throw HttpError(404, 'Not found');
	}
	res.json(updateUserName);
};

module.exports = updateUserName;
