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
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw HttpError(404, 'User not found');
    }

    const { weight, gender, activityTime, willDrink, dailyNorma } = user;

    res.status(200).json({
      weight,
      gender,
      activityTime,
      willDrink,
      dailyNorma,
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { getDailyNorma };