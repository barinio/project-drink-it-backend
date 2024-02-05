const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const { fetchDailyNorma} = require('../services/api');

const getDailyNorma = async (req, res) => {

	try {
		const { id } = req.params;

		const user = await User.findById({ _id: id });

		if (!user) {
			throw HttpError(404, 'User not found');
		}


		const { dailyNorma = 2000, weight = 0, gender = '', activityTime = 0, willDrink = 0 } = user;

		// Return the extracted properties in the response
		res.status(200).json({
			dailyNorma,
			weight,
			gender,
			activityTime,
			willDrink,
		});
	} catch (error) {
		res.status(error.status || 500).json({
			error: error.message || 'Internal Server Error',
		});
	}
};

module.exports = getDailyNorma;
