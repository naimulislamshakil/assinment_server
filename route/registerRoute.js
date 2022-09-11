const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const registerSchema = require('../schma/registerSchma');

// Create model
const Register = new mongoose.model('Register', registerSchema);

route.post('/register', async (req, res) => {
	try {
		// bcrypt password
		const bcryptPassword = await bcrypt.hash(req.body.password, 10);

		const { name, email, password } = new Register({
			name: req.body.name,
			email: req.body.email,
			password: bcryptPassword,
		});

		const user = { name, email, password };
		const isExzis = { email: email };
		if (isExzis) {
			res.json({
				message: 'User Alredy Register!',
			});
		} else {
			await user.save();

			res.status(200).json({
				message: 'Register was successfully!',
			});
		}
	} catch {
		res.status(500).json({
			message: 'Register was failed!',
		});
	}
});

module.exports = route;
