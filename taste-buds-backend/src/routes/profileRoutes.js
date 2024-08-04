const { Router } = require('express');
const { model } = require('mongoose');
const { validateProfile } = require('../util/validators');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const requireAuth = require('../middleware/requireAuth');
const Profile = model('Profile');
const User = model('User');
const Chat = model('Chat');
const Message = model('Message');
const router = Router();

const storage = multer.memoryStorage();
const filter = (req, file, cb) => {
	file.mimetype.startsWith('image')
		? cb(null, true)
		: cb({ message: 'Unsupported file format.' }, false);
};
const upload = multer({
	storage: storage,
	fileFilter: filter,
	limits: { fileSize: 6000000000, fieldSize: 25 * 1024 * 1024 },
});

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

const cloudinaryUpload = async (fileToUpload) => {
	const options = {
		use_filename: true,
		unique_filename: true,
		overwrite: true,
		resource_type: 'auto',
	};

	try {
		const data = await cloudinary.uploader.upload(fileToUpload, options);

		return { url: data?.secure_url };
	} catch (err) {
		return err;
	}
};

// Create
router.post(
	'/profiles/create',
	requireAuth,
	upload.single('file'),
	async (req, res) => {
		const { valid, errors } = validateProfile(req?.body);

		if (!valid) return res.status(400).json(errors);

		const profile = await Profile.findOne({ user: req?.user?._id });

		if (profile) {
			errors.profile = 'Error, profile already exists!';
			return res.status(400).json(errors);
		}

		const { dob, location, favorites, b64str, ...others } = req?.body;

		try {
			let newProfileData;
			if (b64str) {
				const uploadedImage = await cloudinaryUpload(b64str);
				newProfileData = {
					...others,
					handle: req?.user?.handle,
					dob: JSON.parse(dob),
					location: JSON.parse(location),
					favorites: JSON.parse(favorites),
					profilePhoto: uploadedImage?.url,
					user: req?.user?._id,
				};
			} else {
				newProfileData = {
					...req?.body,
					user: req?.user?._id,
				};
			}

			const newProfile = new Profile(newProfileData);
			await newProfile?.save();

			res.status(201).json({
				success: 'Profile created successfully!',
				profile: newProfile,
			});
		} catch (err) {
			console.log('Profile error: ', err);
			errors.profile = 'Error creating profile.';
			return res.status(400).json(errors);
		}
	}
);

// Read
router.get('/profiles', requireAuth, async (req, res) => {
	let errors = {};
	const hasGender = req?.query?.gender;
	const hasFood = req?.query?.food;
	const hasHandle = req?.query?.handle;
	const hasId = req?.query?.id;

	try {
		let profiles;

		if (hasGender) {
			if (hasGender === 'everyone') {
				profiles = await Profile.find({}).populate('matches');
			} else {
				profiles = await Profile.find({ genderIdentity: hasGender }).populate(
					'matches'
				);
			}
		} else if (hasFood) {
			profiles = await Profile.find({ favorites: hasFood }).populate('matches');
		} else if (hasId) {
			profiles = await Profile.findById(hasId).populate('matches');
		} else {
			profiles = await Profile.find({}).populate('matches');
		}

		const active = req?.user._id;
		const activeProfile = await Profile.findOne({ user: req?.user?._id });
		const apMatches = activeProfile?.matches;
		const matchedIds = apMatches.map((profileId) => profileId.toString());

		let sanitizedProfiles;

		if (Array.isArray(profiles)) {
			sanitizedProfiles = profiles?.filter(
				(item) =>
					item.user.toString() !== active.toString() &&
					!matchedIds.includes(item._id.toString())
			);
		} else {
			sanitizedProfiles = profiles;
		}

		res.status(201).json(sanitizedProfiles);
	} catch (err) {
		console.log(err);
		errors.profiles = 'Error getting profiles';
		return res.status(400).json(errors);
	}
});

// Update All
router.put('/profiles', async (req, res) => {
	try {
		const updated = await Profile.updateMany(
			{},
			{
				$set: { theme: 'light' },
			}
		);

		res.json(updated);
	} catch (err) {
		return res.status(400).json(err);
	}
});

// Update
router.put('/profiles/:profileId/update', requireAuth, async (req, res) => {
	let errors = {};

	const profileId = req?.params?.profileId;

	try {
		const updatedProfile = await Profile.findByIdAndUpdate(
			profileId,
			{
				$set: req?.body,
			},
			{
				new: true,
			}
		).populate('matches');

		if (!updatedProfile) {
			errors.profiles = 'Error, profile not found!';
			return res.status(404).json(errors);
		}

		res.json({ updatedProfile, success: 'Profile updated successfully!' });
	} catch (err) {
		errors.profiles = 'Error updating profiles!';
		return res.status(400).json(errors);
	}
});

// Update Profile Pic
router.put(
	'/profiles/:profileId/profile-pic',
	requireAuth,
	upload.single('file'),
	async (req, res) => {}
);

// Upload Food Porn
router.put(
	'/profiles/:profileId/food-porn',
	requireAuth,
	upload.single('file'),
	async (req, res) => {
		let errors = {};

		const { profileId } = req?.params;
		const { b64str, url } = req?.body;

		try {
			let updated;

			if (b64str) {
				const uploadedImage = await cloudinaryUpload(b64str);

				updated = await Profile.findByIdAndUpdate(
					profileId,
					{
						$addToSet: { images: uploadedImage?.url },
					},
					{
						new: true,
					}
				).populate('matches');
			} else if (url) {
				updated = await Profile.findByIdAndUpdate(
					profileId,
					{
						$pull: { images: url },
					},
					{
						new: true,
					}
				).populate('matches');
			}

			if (!updated) {
				errors.profile = 'Error, profile not found!';
				return res.status(404).json(errors);
			}

			res.json({
				success: b64str
					? 'Photo uploaded successfully!'
					: url && 'Photo deleted successfully!',
				updated,
			});
		} catch (err) {
			console.log(err);
			errors.profile = 'Error uploading food porn!';
			return res.status(400).json(errors);
		}
	}
);

// Delete
router.delete('/profiles/:profileId/delete', requireAuth, async (req, res) => {
	let errors = {};
	const { profileId } = req?.params;

	const deleted = await Profile.findByIdAndDelete(profileId);

	try {
		if (!deleted) {
			errors.profile =
				"Error, profile not found or you don't have permission to delete it.";
			return res.status(404).json(errors);
		}

		await User.findByIdAndDelete(deleted?.user);

		const chats = await Chat.find({
			users: { $elemMatch: { $eq: profileId } },
		});

		chats?.forEach(async (chat) => {
			// const messages = await Message.find({ chat: chat._id });

			await Message.deleteMany({ chat: chat._id });

			// messages?.forEach(async (message) => {
			// 	await Message.findByIdAndDelete(message._id);
			// });

			await Chat.findByIdAndDelete(chat._id);
		});

		return res.json({ success: 'Account Deleted Successfully!' });
	} catch (err) {
		console.log(err);
		errors.profile = 'Error, unable to delete account!';
		return res.status(400).json(errors);
	}
});

module.exports = router;
