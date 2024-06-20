const { Router } = require('express');
const { model } = require('mongoose');
const { sign } = require('jsonwebtoken');
const { genSalt, hash } = require('bcrypt');
const { createHash } = require('crypto');
const { config } = require('dotenv');
const { validateRegistration, validateLogin } = require('../util/validators');
const sgMail = require('@sendgrid/mail');

const User = model('User');
const router = Router();
config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Register
router.post('/users/signup', async (req, res) => {
	const { valid, errors } = validateRegistration(req?.body);

	if (!valid) return res.status(400).json(errors);

	const { handle, email, password } = req?.body;

	const user = await User.findOne({ $or: [{ handle }, { email }] });

	if (user) {
		if (handle === user.handle) {
			errors.handle = 'Handle already in use.';
		} else {
			errors.email = 'Email already in use.';
		}

		return res.status(400).json(errors);
	}

	try {
		const newUserData = {
			handle,
			email,
			password,
			role: email === 'brandon@digitalkatana.dev' ? 'admin' : 'user',
		};

		const newUser = new User(newUserData);
		await newUser?.save();
		const token = sign({ userId: newUser?._id }, process.env.DB_SECRET_KEY, {
			expiresIn: '10d',
		});

		res
			.status(201)
			.json({ success: 'Account created successfully!', user: newUser, token });
	} catch (err) {
		console.log('Signup error: ', err);
		errors.registration = 'Error creating account, please try again.';
		return res.status(400).json(errors);
	}
});
// Login
router.post('/users/signin', async (req, res) => {
	const { valid, errors } = validateLogin(req?.body);

	if (!valid) return res.status(400).json(errors);

	const { login, password } = req?.body;

	const user = await User.findOne({
		$or: [{ handle: login }, { email: login }],
	}).populate('profile');

	if (!user) {
		errors.login = 'Error, user not found!';
		return res.status(404).json(errors);
	}

	try {
		await user?.comparePassword(password);

		const token = sign({ userId: user?._id }, process.env.DB_SECRET_KEY, {
			expiresIn: '10d',
		});

		res.json({
			success: 'Login successful!',
			userProfile: user.profile[0],
			token,
		});
	} catch (err) {
		console.log('Signin Error: ', err);
		errors.login = 'Something went wrong! Please try again.';
		return res.status(400).json(errors);
	}
});
// Generate Password Token

// Password Reset

// Update User

// Delete User

module.exports = router;
