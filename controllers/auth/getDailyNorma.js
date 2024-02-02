// const { User } = require('../../models');
// const { HttpError } = require('../../helpers');

// const getDailyNorma = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const userData = await User.findById(id, {
//       _id: 0,
//       gender: 1,
//       weight: 1,
//       activityTime: 1,
//       willDrink: 1,
//       dailyNorma: 1,
//     });
//     res.json(userData);
//   } catch (error) {
//     throw HttpError(404, 'Not found');
//   }
// };

// module.exports = getDailyNorma;



// const getDailyNorma = async (req, res) => {
// 	const { _id, gender, weight, dailyNorma, activityTime, willDrink } = req.user;
// 	res.json({ _id, gender, weight, dailyNorma, activityTime, willDrink });
// };

// module.exports = getDailyNorma;


const { User } = require('../models');
const { HttpError } = require('../helpers');
// const { schemas } = require('../models/userModel');

const getDailyNorma = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const dailyNormaData = {
      dailyNorma: user.dailyNorma,
      weight: user.weight,
      gender: user.gender,
      activityTime: user.activityTime,
      willDrink: user.willDrink,
    };

    return res.status(200).json(dailyNormaData);
  } catch (error) {
    throw HttpError(404, 'Not found');
  }
};

module.exports = getDailyNorma;