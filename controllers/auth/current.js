const current = async (req, res) => {
	const { _id, email, userName, dailyNorma, avatarURL, gender } = req.user;
	res.json({ _id, email, userName, dailyNorma, avatarURL, gender });
};
module.exports = current;
