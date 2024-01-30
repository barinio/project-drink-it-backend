const { validate } = require('uuid');

exports.validateID = (id) => {
	const validid = validate(id);
	return validid
}