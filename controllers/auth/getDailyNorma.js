const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const getDailyNorma = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.findById(id, {
      _id: 0,
      gender: 1,
      weight: 1,
      activityTime: 1,
      willDrink: 1,
      dailyNorma: 1,
    });
    res.json(userData);
  } catch (error) {
    throw HttpError(404, 'Not found');
  }
};

module.exports = getDailyNorma;
