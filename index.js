const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// add meddileware
app.use(cors());
app.use(express.json());

// connect mongoose
mongoose
	.connect(process.env.DB)
	.then(() => console.log('DB is connected.'))
	.catch((err) => console.log(err));

app.get('/', (req, res) => {
	res.send('How are you?');
});

app.listen(port, () => {
	console.log(`server is running: ${port}`);
});
