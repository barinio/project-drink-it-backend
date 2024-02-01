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

	const user = await User.findById(id);

	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	if (outdatedPassword) {
		const passwordCompare = await bcrypt.compare(outdatedPassword, user.password);
		if (!passwordCompare) {
			throw HttpError(401, 'outdated password is wrong');
		}
	}

	if (!outdatedPassword && newPassword && repeatedNewPassword && repeatedNewPassword !== newPassword) {
		throw HttpError(401, 'new password and repeated new password must be the same');
	} else if (newPassword && repeatedNewPassword && repeatedNewPassword === newPassword) {
		const newHashPassword = await bcrypt.hash(newPassword, 10);
		console.log(newHashPassword);
		user.password = newHashPassword;
		console.log(user.password);
	} else {
		res.json({ user });
	}

	await User.findByIdAndUpdate(id, { password: user.password });

	// const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
	// if (!updatedUser) {
	// 	throw HttpError(404, 'Not found');
	// }

	// if (outdatedPassword) {
	// 	const passwordCompare = await bcrypt.compare(outdatedPassword, updatedUser.password);
	// 	if (!passwordCompare) {
	// 		throw HttpError(401, 'outdated password is wrong');
	// 	}
	// }

	// console.log(updatedUser.outdatedPassword);
	// console.log(updatedUser.newPassword);
	// console.log(updatedUser.repeatedNewPassword);

	// const hashPassword = await bcrypt.hash(repeatedNewPassword, 10);
	// console.log(hashPassword);
	// console.log(updatedUser.password);
	// updateUser.password = hashPassword;
	// // updatedUser.password = hashPassword;
	// console.log(updateUser.password);

	// if (newPassword && repeatedNewPassword && repeatedNewPassword !== newPassword) {
	// 	throw HttpError(401, 'new password and repeated new password must be the same');
	// } else if (newPassword && repeatedNewPassword && repeatedNewPassword === newPassword) {
	// 	const hashPassword = await bcrypt.hash(newPassword, 10);
	// 	updatedUser.password = hashPassword;
	// 	console.log(updatedUser.password);
	// } else {
	// 	res.json({ _id, email, userName, dailyNorma, avatarURL, gender });
	// }

	res.json({ user });
	// res.json({ _id, email, userName, dailyNorma, avatarURL, gender });
};

module.exports = updateUser;
