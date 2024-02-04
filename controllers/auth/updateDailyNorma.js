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


const updateDailyNorma = async (req, res) => {
	try {
	  const { _id } = req.user;
	  const {
		newDailyNorma,
		newWeight,
		newGender,
		newActivityTime,
		newWillDrink,
	  } = req.body;
  
	  const updatedUser = await User.findByIdAndUpdate(
		_id,
		{
		  $set: {
			dailyNorma: newDailyNorma,
			weight: newWeight,
			gender: newGender,
			activityTime: newActivityTime,
			willDrink: newWillDrink,
		  },
		},
		{ new: true }
	  );
  
	  if (!updatedUser) {
		throw HttpError(404, 'Not found');
	  }
  
	  res.status(200).json({
		updatedDailyNorma: updatedUser.dailyNorma || 0,
		updatedWeight: updatedUser.weight || 0,
		updatedGender: updatedUser.gender || '',
		updatedActivityTime: updatedUser.activityTime || 0,
		updatedWillDrink: updatedUser.willDrink || 0,
	  });
	} catch (error) {
	  res.status(error.status || 500).json({
		error: error.message || 'Internal Server Error',
	  });
	}
  };

module.exports = updateDailyNorma;
