

exports.resultMonthArray = (ARR, dailyNorma, last, year, month) => {
	const monthArray = ARR;
	const newARR = [];

	for (let i = 1; i <= last; i++) {
		const day = i < 10 ? `0${i}` : `${i}`;

		let d;

		if (month > 8) {
			d = new Date(`${year}-${month + 1}-${day}`);
		} else {
			d = new Date(`${year}-0${month + 1}-${day}`);
		}

		const found = monthArray.find((element) => Date.parse(element._id) === Date.parse(d));

		if (!found) {
			newARR.push({
				_id: d,
				drankWater: 0,
				perDay: 0,
				dailyNorma: dailyNorma,
				persent: 0,
			});
		} else {
			newARR.push(found);
		}
	}

	return newARR;
}
