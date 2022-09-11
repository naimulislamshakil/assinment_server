const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const registerRoute = require('./route/registerRoute');
const port = process.env.PORT || 5000;

// add meddileware
app.use(cors());
app.use(express.json());

// connect mongoose
mongoose
	.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('DB is connected.'))
	.catch((err) => console.log(err));

app.get('/', (req, res) => {
	res.send('How are you?');
});

app.use('/user', registerRoute);

// default error handler
app.use((req, res, next) => {
	const err = new Error('Not Found!');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	});
});

app.listen(port, () => {
	console.log(`server is running: ${port}`);
});
