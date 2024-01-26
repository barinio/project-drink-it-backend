const { Water } = require('../../models/waterModel');

const listContacts = async (req, res) => {
	// const { _id: owner } = req.user;
	// const { page = 1, limit = 20, favorite } = req.query;
	// const skip = (page - 1) * limit;

	// const filter = { owner };

	// if (favorite !== undefined) {
	// 	filter.favorite = favorite === 'true';
	// }

	// const water = await Water.find(filter, '-createdAt -updatedAt', { skip, limit });
	// res.json(water);

	const water = await Water.find({
		waterRate: '1000'
	});
	console.log(water);
	res.json(water);
};

module.exports = listContacts;
