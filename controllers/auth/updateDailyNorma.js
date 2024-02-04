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


const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const { updateDailyNorma } = require('../services/api');


const updateDailyNorma = async (req, res) => {
  try {
    const { _id } = req.user;
    const { newDailyNorma, weight, gender, activityTime, willDrink } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      $set: {
      dailyNorma: newDailyNorma,
      weight: weight,
      gender: gender,
      activityTime: activityTime,
      willDrink: willDrink,
      },
    },
    { new: true }
    );
  
    if (!updatedUser) {
    throw HttpError(404, 'User not found');
    }

    res.status(200).json({
    updatedUser: {
      dailyNorma: updatedUser.dailyNorma || 0,
      weight: updatedUser.weight || 0,
      gender: updatedUser.gender || '',
      activityTime: updatedUser.activityTime || 0,
      willDrink: updatedUser.willDrink || 0,
    },
    });
  } catch (error) {
    res.status(error.status || 500).json({
    error: error.message || 'Internal Server Error',
    });
  }
  };

module.exports = updateDailyNorma;
