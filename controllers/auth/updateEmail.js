const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const updateEmail = async (req, res) => {
	const { id } = req.params;
	const updatedEmail = await User.findByIdAndUpdate(id, req.body, { new: true });
	if (!updatedEmail) {
		throw HttpError(404, 'Not found');
	}
	res.json(updateEmail);
};

module.exports = updateEmail;
