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

const { User } = require('../models');
const { HttpError } = require('../helpers');
// const { schemas } = require('../models/userModel');

const updateDailyNorma = async (req, res) => {
	try {
	  const { id } = req.params;
	  const { dailyNorma, gender, weight, activityTime, willDrink } = req.body;
  
	  const updatedUser = await User.findByIdAndUpdate(
		id,
		{
		  dailyNorma,
		  gender,
		  weight,
		  activityTime,
		  willDrink,
		},
		{ new: true }
	  );
  
	  if (!updatedUser) {
		throw HttpError(404, 'User not found');
	  }
  
	  res.status(200).json(updatedUser);
	} catch (error) {
	  res.status(error.status || 500).json({ error: error.message });
	}
  };
  
  module.exports = { updateDailyNorma };