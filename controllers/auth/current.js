const current = async (req, res) => {
	const { _id, email, userName, dailyNorma, avatarURL, gender } = req.user;
	// console.log(password);
	res.json({ _id, email, userName, dailyNorma, avatarURL, gender });
};
module.exports = current;
