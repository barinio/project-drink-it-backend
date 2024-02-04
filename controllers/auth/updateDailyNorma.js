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
const { updateDailyNorma } = require('../services/api');


const updateDailyNorma = async (req, res) => {
  try {
    const { _id } = req.user;
    const { newDailyNorma, newWeight, newGender, newActivityTime, newWillDrink } = req.body;

    await User.findByIdAndUpdate(
    _id,
    {
      dailyNorma: newDailyNorma,
      weight: newWeight,
      gender: newGender,
      activityTime: newActivityTime,
      willDrink: newWillDrink,
      },
    { new: true }
    );
  
    // if (!updatedUser) {
    // throw HttpError(404, 'User not found');
    // }

    res.status(200).json({
		_id: _id,
    	dailyNorma: newDailyNorma,
    	weight: newWeight,
    	gender: newGender,
    	activityTime: newActivityTime,
    	willDrink: newWillDrink,
    });
  } catch (error) {
    res.status(error.status || 500).json({
    error: error.message || 'Internal Server Error',
    });
  }
  };

module.exports = updateDailyNorma;
