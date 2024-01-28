const mongoose = require('mongoose');

const app = require('./app');

const { MONGO_HOST, DB_NAME, BASE_URL } = process.env;

mongoose.set('strictQuery', true);

mongoose
	.connect(MONGO_HOST, { dbName: DB_NAME })
	.then(() => {
		app.listen(BASE_URL);
		console.log('Database connection successful');
	})
	.catch(e => {
		console.log('Error connecting to the database:', e.message);
		process.exit(1);
	});
