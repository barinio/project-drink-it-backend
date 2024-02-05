const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const getDailyNorma = async (req, res) => {
  try {
    const { id, dailyNorma, weight, gender, activityTime, willDrink } = req.user;


    const user = await User.findById({ _id: id });

    if (!user) {
      throw HttpError(404, 'User not found');
    }


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
