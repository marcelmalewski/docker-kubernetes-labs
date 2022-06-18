const express = require('express');
const app = express();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
app.use(express.json());

const users = require('./routes/users');
app.use('/users', users);

const todos = require('./routes/todos');
app.use('/todos', todos);

const recentlyDeleted = require('./routes/recentlyDeleted');
app.use('/recentlyDeleted', recentlyDeleted);

require('dotenv').config();

const mongoose = require('mongoose');
const client = require('./config/redisClient');

mongoose
	.connect(`mongodb://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@${process.env.MONGO_URL}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(response => {
		console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)

		client.on('connect', () => {
			console.log(`Connected to Redis.`)
		});
		client.on('error', error => {
			console.error('Error connecting to Redis', error);
		});
	

		const port = process.env.PORT || 5000
		app.listen(port, () => {
			console.log(`API server listening at http://localhost:${port}`);
		});
	})
	.catch(error => console.error('Error connecting to MongoDB', error));

app.get('/', async (req, res) => {
	return res.send('Hello world');
})