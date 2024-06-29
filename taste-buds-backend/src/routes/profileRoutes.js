const { Router } = require('express');
const { model } = require('mongoose');
const { validateProfile } = require('../util/validators');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const requireAuth = require('../middleware/requireAuth');
const Profile = model('Profile');
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
				profiles = await Profile.find({});
			} else {
				profiles = await Profile.find({ genderIdentity: hasGender });
			}
		} else if (hasFood) {
			profiles = await Profile.find({ favorites: hasFood });
		} else if (hasId) {
			profiles = await Profile.findById(hasId);
		} else {
			profiles = await Profile.find({});
		}

		res.status(201).json(profiles);
	} catch (err) {
		errors.profiles = 'Error getting profiles';
		return res.status(400).json(errors);
	}
});

module.exports = router;
