const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	// if (!user.verify) {
	// 	throw HttpError(401, 'Email not verified');
	// }

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const payload = { id: user._id };
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
	await User.findByIdAndUpdate(user._id, { token });

	const {
		_id,
		avatarURL,
		verify,
		verificationToken,
		userName,
		gender,
		weight,
		activityTime,
		willDrink,
		dailyNorma,
	} = user;

	res.json({
		token,
		user: {
			_id,
			email,
			avatarURL,
			verify,
			verificationToken,
			userName,
			gender,
			weight,
			activityTime,
			willDrink,
			dailyNorma,
		},
	});
	// res.json(user);
};

module.exports = login;
