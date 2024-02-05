const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteUser = async (req, res) => {
	const { id } = req.params;
	const result = await User.findByIdAndDelete(id);
	if (!result) {
		throw HttpError(404, 'Not Found');
	}
	res.json({
		message: 'User deleted',
	});
};

module.exports = deleteUser;
