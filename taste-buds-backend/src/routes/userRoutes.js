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
router.post('/users/register', async (req, res) => {
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
	} catch (err) {}
});
// Login

// Generate Password Token

// Password Reset

// Update User

// Delete User
