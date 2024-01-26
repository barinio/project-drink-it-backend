const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateUser = async (req, res) => {
	const { id } = req.params;
	const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
	if (!updatedUser) {
		throw HttpError(404, 'Not found');
	}
	res.json(updateUser);
};

module.exports = updateUser;
