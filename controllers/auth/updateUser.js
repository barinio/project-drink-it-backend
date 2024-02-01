const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
	const { id } = req.params;
	const {
		_id,
		email,
		outdatedPassword,
		userName,
		dailyNorma,
		avatarURL,
		gender,
		newPassword,
		repeatedNewPassword,
	} = req.body;

	const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
	if (!updatedUser) {
		throw HttpError(404, 'Not found');
	}

	if (outdatedPassword) {
		const passwordCompare = await bcrypt.compare(outdatedPassword, updatedUser.password);
		if (!passwordCompare) {
			throw HttpError(401, 'outdated password is wrong');
		}
	}

	if (newPassword && repeatedNewPassword && repeatedNewPassword !== newPassword) {
		throw HttpError(401, 'new password and repeated new password must be the same');
	} else if (newPassword && repeatedNewPassword && repeatedNewPassword === newPassword) {
		const hashPassword = await bcrypt.hash(newPassword, 10);
		updatedUser.password = hashPassword;
		console.log(updatedUser.password);
	} else {
		res.json({ _id, email, userName, dailyNorma, avatarURL, gender });
	}

	res.json({ _id, email, userName, dailyNorma, avatarURL, gender });
};

module.exports = updateUser;
