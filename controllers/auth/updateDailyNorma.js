// const { User } = require('../../models');
const { HttpError } = require('../../helpers');


const { User } = require('../../models');

const updateDailyNorma = async (req, res) => {
	try {
		const { _id } = req.user;
		const { willDrink, dailyNorma, ...body } = req.body;
		const sendNorma = !willDrink ? dailyNorma : willDrink;

		const updatedUser = await User.findByIdAndUpdate(
			_id,
			{
				...body,
				willDrink: willDrink,
				dailyNorma: sendNorma,

			},
			{ new: true }
		);


		if (!updatedUser) {
			throw HttpError(404, 'Not found');
		}

		res.status(200).json({
			dailyNorma: updatedUser.dailyNorma,
			weight: updatedUser.weight,
			gender: updatedUser.gender,
			activityTime: updatedUser.activityTime,
			willDrink: updatedUser.willDrink,
		});
	} catch (error) {
		res.status(error.status || 500).json({
			error: error.message || 'Internal Server Error',
		});
	}
};


module.exports = updateDailyNorma;
