const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const getDailyNorma = async (req, res) => {
  try {
    // Retrieve user's information including dailyNorma from the database
    const { id } = req.params; // Change to req.params to get the user ID from the route params

    const user = await User.findById(id);

    if (!user) {
      throw HttpError(404, 'User not found');
    }

    // Destructure user object with default values
    const {
      dailyNorma = 0,
      weight = 0,
      gender = '',
      activityTime = 0,
      willDrink = false, // Assuming willDrink is a boolean property
    } = user;

    // Return the extracted properties in the response
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
