const { ctrlWrapper } = require('../helpers');

const register = require('./auth/register');
const verifyEmail = require('./auth/verifyEmail');
const resendVerifyEmail = require('./auth/resendVerifyEmail');
const login = require('./auth/login');
const logout = require('./auth/logout');
const current = require('./auth/current');
const updateUser = require('./auth/updateUser');

const updateDailyNorma = require('./auth/updateDailyNorma');

const listContacts = require('./contacts/listContacts');
const getContactById = require('./contacts/getContactById');
const addContact = require('./contacts/addContact');
const removeContact = require('./contacts/removeContact');
const updateContact = require('./contacts/updateContact');
const updateStatusContact = require('./contacts/updateStatusContact');

module.exports = {
	register: ctrlWrapper(register),
	verifyEmail: ctrlWrapper(verifyEmail),
	resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
	current: ctrlWrapper(current),
	updateUser: ctrlWrapper(updateUser),
	updateDailyNorma: ctrlWrapper(updateDailyNorma),

	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContact: ctrlWrapper(updateContact),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};
