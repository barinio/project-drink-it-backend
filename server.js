const mongoose = require('mongoose');

const app = require('./app');

const { MONGO_HOST, DB_NAME } = process.env;

mongoose.set('strictQuery', true);

mongoose
	.connect(MONGO_HOST, { dbName: DB_NAME })
	.then(can => {
		app.listen(3000);
		console.log('mongo.db is connected');
	})
	.catch(err => {
		console.log(err);
		process.exit(1);
	});
