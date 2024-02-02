// const { User } = require('../../models');
// const { HttpError } = require('../../helpers');

// const updateDailyNorma = async (req, res) => {
// 	const { id } = req.params;
// 	const updatedDailyNorma = await User.findByIdAndUpdate(id, req.body, { new: true });
// 	if (!updatedDailyNorma) {
// 		throw HttpError(404, 'Not found');
// 	}
// 	res.json(updatedDailyNorma);
// };

// module.exports = updateDailyNorma;

const { User } = require('../../models');
const { HttpError } = require('../../helpers');
// const { schemas } = require('../models/userModel');

const updateDailyNorma = async (req, res) => {
	try {
		const { error } = schemas.updateDailyNormaSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		const updatedUserData = {
			dailyNorma: req.body.dailyNorma,
			weight: req.body.weight,
			gender: req.body.gender,
			activityTime: req.body.activityTime,
			willDrink: req.body.willDrink,
		};

		const user = await User.findByIdAndUpdate(req.user.id, updatedUserData, { new: true });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		return res.status(200).json(updatedUserData);
	} catch (error) {
		throw HttpError(404, 'Not found');
	}
};

module.exports = { updateDailyNorma };
