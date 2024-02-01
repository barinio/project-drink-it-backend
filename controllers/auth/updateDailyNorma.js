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
  const { id } = req.params;

  try {
    // Extracting the fields you want to update from req.body
    const { gender, weight, activityTime, dailyNorma, willDrink } = req.body;

    // Find the user by id and update the specified fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        gender,
        weight,
        activityTime,
        dailyNorma,
        willDrink,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw HttpError(404, 'Not found');
    }

    // Return the updated user data
    res.json(updatedUser);
  } catch (error) {
    // Handle any errors that occurred during the update
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = updateDailyNorma;
