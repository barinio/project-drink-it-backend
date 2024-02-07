const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
	const { _id } = req.user;
	const { email, userName, dailyNorma, avatarURL, gender, outdatedPassword, newPassword } = req.body;

	const user = await User.findById(_id);

	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	if (outdatedPassword) {
		const passwordCompare = await bcrypt.compare(outdatedPassword, user.password);
		if (!passwordCompare) {
			throw HttpError(401, 'outdated password is wrong');
		}
	}

	if (!outdatedPassword && newPassword) {
		throw HttpError(401, 'outdated password is absent');
	} else if (outdatedPassword && !newPassword) {
		throw HttpError(401, 'new password is absent');
	} else if (outdatedPassword && newPassword && outdatedPassword === newPassword) {
		throw HttpError(401, 'outdated password and new password must be different');
	} else if (outdatedPassword && newPassword) {
		const newHashPassword = await bcrypt.hash(newPassword, 10);
		user.password = newHashPassword;
	}

	await User.findByIdAndUpdate(
		_id,
		{
			password: user.password,
			email,
			userName,
			dailyNorma,
			avatarURL,
			gender,
		},
		{ new: true }
	);

	res.json({
		_id,
		email,
		userName,
		dailyNorma,
		avatarURL,
		gender,
	});
};

module.exports = updateUser;
