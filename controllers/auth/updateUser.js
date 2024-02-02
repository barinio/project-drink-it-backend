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
	console.log('user.password:', user.password);

	if (outdatedPassword) {
		const passwordCompare = await bcrypt.compare(outdatedPassword, user.password);
		if (!passwordCompare) {
			throw HttpError(401, 'outdated password is wrong');
		}
	}

	if (!outdatedPassword && newPassword && repeatedNewPassword && repeatedNewPassword !== newPassword) {
		throw HttpError(401, 'new password and repeated new password must be the same');
	}

	if (newPassword && repeatedNewPassword && repeatedNewPassword === newPassword) {
		const newHashPassword = await bcrypt.hash(newPassword, 10);
		console.log('newHashPassword:', newHashPassword);
		user.password = newHashPassword;
		console.log('user.password:', user.password);
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
			// outdatedPassword: user.outdatedPassword,
			// newPassword: user.newPassword,
			// repeatedNewPassword: user.repeatedNewPassword,
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
		outdatedPassword,
		newPassword,
		repeatedNewPassword,
	});
};

module.exports = updateUser;

// console.log(outdatedPassword);
// console.log(user.password);
// const hashPasswordNew = await bcrypt.hash(outdatedPassword, 10);
// console.log(outdatedPassword);

// const passwordCompare = await bcrypt.compare(outdatedPassword, hashPasswordNew);
// console.log(passwordCompare);

// res.json({ user });

// await User.findByIdAndUpdate(id, { password: user.password });
