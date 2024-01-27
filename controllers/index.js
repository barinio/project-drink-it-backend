const { ctrlWrapper } = require('../helpers');

const register = require('./auth/register');
const verifyEmail = require('./auth/verifyEmail');
const resendVerifyEmail = require('./auth/resendVerifyEmail');
const login = require('./auth/login');
const logout = require('./auth/logout');
const current = require('./auth/current');
const updateUser = require('./auth/updateUser');
const updateDailyNorma = require('./auth/updateDailyNorma');

module.exports = {
	register: ctrlWrapper(register),
	verifyEmail: ctrlWrapper(verifyEmail),
	resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
	current: ctrlWrapper(current),
	updateUser: ctrlWrapper(updateUser),
	updateDailyNorma: ctrlWrapper(updateDailyNorma),
};
