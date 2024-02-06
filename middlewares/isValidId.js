const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

exports.isValidId = (req, res, next) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		next(HttpError(404, `${id} is not a valid id`));
	}
	next();
};

exports.isValidTodayID = (req, res, next) => {
	const { todayID } = req.params;
	if (!isValidObjectId(todayID)) {
		next(HttpError(404, `${todayID} is not a valid id`));
	}
	next();
};


