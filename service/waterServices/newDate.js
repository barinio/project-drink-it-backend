

exports.newDate = () => {
	const d = new Date();
	d.setUTCHours(0, 0, 0, 0);
	const date = d.toISOString();
	return date;
}