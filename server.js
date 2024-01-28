const mongoose = require('mongoose');

const app = require('./app');

const { MONGO_HOST, PORT, DB_NAME } = process.env;

mongoose
	.connect(MONGO_HOST, { dbName: DB_NAME })
	.then(() => {
		app.listen(PORT);
		console.log('Database connection successful');
	})
	.catch(e => {
		console.log('Error connecting to the database:', e.message);
		process.exit(1);
	});
