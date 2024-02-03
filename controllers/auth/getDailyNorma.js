const { User } = require('../../models');
const { HttpError } = require('../../helpers');
// const { schemas } = require('../models/userModel');

const getDailyNorma = async (req, res) => {
  try {
    // Retrieve user's information including dailyNorma from the database
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!edit) {
      throw HttpError(404, 'User not found');
    }

    const {
      dailyNorma = 0,
      weight = 0,
      gender = '',
      activityTime = 0,
      willDrink = 0,
    } = user;

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
