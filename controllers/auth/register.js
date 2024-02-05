const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const { SECRET_KEY } = process.env;

// const { BASE_URL } = process.env;

const register = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const verificationToken = randomUUID();
	const userName = email.split('@')[0];
	const dailyNorma = 2000;

	const newUser = await User.create({
		...req.body,
		password: hashPassword,

		verificationToken,
		userName,
		dailyNorma,
	});

	// const verifyEmail = {
	// 	to: email,
	// 	subject: 'Verification email',
	// 	html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
	// };
	// await sendEmail(verifyEmail);
	const payload = { id: newUser._id };
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
	await User.findByIdAndUpdate(newUser._id, { token });

	res.status(201).json({
		token,
		user: {
			_id: newUser.id,
			email: newUser.email,
			userName: newUser.userName,
			avatarURL: newUser.avatarURL,
			verificationToken: newUser.verificationToken,
			dailyNorma: newUser.dailyNorma,
		},
	});
};

module.exports = register;
