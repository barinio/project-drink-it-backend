const { Water } = require('../../models');
const { HttpError } = require('../../helpers');

const editWater = async (req, res) => {
	const { _id } = req.query;
	const { id } = req.params;

	const { time, waterVolume } = req.body;

	const { dailyNorma } = req.user;
	const persentWater = (waterVolume / dailyNorma) * 100;


	const edit = await Water.updateOne({ _id: id, "waterlist.id": _id },
		{
			$inc: { persent: +persentWater },
			"$set": { "waterlist.$.waterVolume": waterVolume, "waterlist.$.time": time }
		}
	);


	// const { waterlist } = await Water.findOneAndUpdate(id);
	// const persentWateronid = waterlist.find(keys => keys.id === _id).persentWater;

	// if (!persentWateronid) {
	// 	throw HttpError(404, 'Not found');
	// }


	// const removeWater = await Water.findByIdAndUpdate(id,
	// 	{
	// 		$inc: { persent: -persentWateronid, perDay: -1 },
	// 		$pull: { waterlist: { id: _id } },
	// 	},

	// { new: true })
	if (!edit) {
		throw HttpError(404, 'Not found');
	}
	res.json({ message: 'deleted' });
};

module.exports = editWater;


// const editWater = async (req, res) => {
// 	const { id } = req.params;
// 	const { dailyNorma } = req.user;
// 	const { waterVolume } = req.body;
// 	const persentWater = (waterVolume / dailyNorma) * 100;


// 	const updatedWater = await Water.findByIdAndUpdate(id, {
// 		...req.body,
// 		persentWater,
// 	}
// 		, { new: true });
// 	if (!updatedWater) {
// 		throw HttpError(404, 'Not found');
// 	}
// 	res.json(updatedWater);
// };

// module.exports = editWater;
