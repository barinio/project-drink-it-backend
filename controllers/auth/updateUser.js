const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
	const { _id } = req.user;
	const {
		email,
		userName,
		dailyNorma,
		avatarURL,
		gender,
		outdatedPassword,
		newPassword,
		repeatedNewPassword,
	} = req.body;

	const user = await User.findById(_id);

	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	// console.log('user.password:', user.password);

	if (outdatedPassword) {
		const passwordCompare = await bcrypt.compare(outdatedPassword, user.password);
		if (!passwordCompare) {
			throw HttpError(401, 'outdated password is wrong');
		}
	}

	if (!outdatedPassword && newPassword) {
		throw HttpError(401, 'outdated password is absent');
	} else if (!outdatedPassword && repeatedNewPassword) {
		throw HttpError(401, 'outdated password is absent');
	} else if (outdatedPassword && !newPassword) {
		throw HttpError(401, 'newPassword  is absent');
	} else if (outdatedPassword && !repeatedNewPassword) {
		throw HttpError(401, 'repeatedNewPassword  is absent');
	} else if (!newPassword && repeatedNewPassword) {
		throw HttpError(401, 'newPassword  is absent');
	} else if (newPassword && !repeatedNewPassword) {
		throw HttpError(401, 'repeatedNewPassword is absent');
	} else if (newPassword !== repeatedNewPassword) {
		throw HttpError(401, 'new password and repeated new password must be the same');
	} else if (outdatedPassword && newPassword === repeatedNewPassword) {
		const newHashPassword = await bcrypt.hash(newPassword, 10);
		// console.log('newHashPassword:', newHashPassword);
		user.password = newHashPassword;
		// console.log('user.password:', user.password);
	} else {
		console.log('something went wrong');
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
