const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const { User } = require('../../models');
const { HttpError } = require('../../helpers');
const { fetchDailyNorma} = require('../services/api');

const getDailyNorma = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
      throw HttpError(404, 'User not found');
    }

    const dailyNormaData = await fetchDailyNorma(userId);

    res.status(200).json({
      dailyNorma: dailyNormaData.dailyNorma || 0,
      weight: user.weight || 0,
      gender: user.gender || '',
      activityTime: user.activityTime || 0,
      willDrink: user.willDrink || 0,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || 'Internal Server Error',
    });
  }
};

module.exports = getDailyNorma;
