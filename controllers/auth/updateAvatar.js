const { User } = require('../../models');

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const avatarURL = req.file.path;

	const user = await User.findByIdAndUpdate(_id, { avatarURL });

	user.avatarURL = avatarURL;

	res.json({ avatarURL: user.avatarURL });
};

module.exports = updateAvatar;
