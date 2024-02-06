const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteUser = async (req, res) => {
	const { _id } = req.user;
	const result = await User.findByIdAndDelete(_id);
	if (!result) {
		throw HttpError(404, 'Not Found');
	}
	res.json({
		message: 'User deleted',
	});
};

module.exports = deleteUser;
