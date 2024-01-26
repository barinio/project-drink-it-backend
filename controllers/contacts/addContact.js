const { Water } = require('../../models');

const addContact = async (req, res) => {
	// const { _id: owner } = req.user;

	const addNewContact = await Water.create({ ...req.body });
	res.status(201).json(addNewContact);
};

module.exports = addContact;
