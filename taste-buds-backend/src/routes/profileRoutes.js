const { Router } = require('express');
const { model } = require('mongoose');
const { validateProfile } = require('../util/validators');
const requireAuth = require('../middleware/requireAuth');
const Profile = model('Profile');
const router = Router();

// Create
router.post('/profile/create', requireAuth, async (req, res) => {
	const { valid, errors } = validateProfile(req?.body);

	if (!valid) return res.status(400).json(errors);

	const profile = await Profile.findOne({ user: req?.user?._id });

	if (profile) {
		errors.profile = 'Error, profile already exists!';
		return res.status(400).json(errors);
	}

	try {
		const newProfileData = {
			...req?.body,
			user: req?.user?._id,
		};

		const newProfile = new Profile(newProfileData);
		await newProfile?.save();

		res
			.status(201)
			.json({ success: 'Profile created successfully!', profile: newProfile });
	} catch (err) {
		console.log('Profile error: ', err);
		errors.profile = 'Error creating profile.';
		return res.status(400).json(errors);
	}
});

module.exports = router;
