// const current = async (req, res) => {
// 	const { _id, email, userName, dailyNorma, avatarURL, gender } = req.user;
// 	res.json({ _id, email, userName, dailyNorma, avatarURL, gender });
// };
// module.exports = current;

const current = async (req, res) => {
	const { _id, email, userName, dailyNorma, avatarURL, gender, willDrink, activityTime, weight } = req.user;
	res.json({ _id, email, userName, dailyNorma, avatarURL, gender, willDrink, activityTime, weight });
};
module.exports = current;