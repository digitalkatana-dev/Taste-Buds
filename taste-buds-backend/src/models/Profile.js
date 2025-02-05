const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
	{
		theme: {
			type: String,
			enum: ['light', 'dark'],
			default: 'light',
		},
		firstName: {
			type: String,
			required: [true, 'First name is required'],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required'],
			trim: true,
		},
		handle: {
			type: String,
			required: [true, 'Handle is required'],
		},
		dob: {
			month: {
				type: Number,
				required: [true, 'DOB is required'],
			},
			day: {
				type: Number,
				required: [true, 'DOB is required'],
			},
			year: {
				type: Number,
				required: [true, 'DOB is required'],
			},
		},
		genderIdentity: {
			type: String,
			required: [true, 'Gender identity is required'],
		},
		showGender: {
			type: Boolean,
			required: [true, 'Gender identity is required'],
		},
		genderInterest: {
			type: String,
			required: [true, 'Gender interest is required'],
		},
		location: {
			city: {
				type: String,
				required: [true, 'City is required.'],
			},
			state: {
				type: String,
				required: [true, 'State is required.'],
			},
			postalCode: {
				type: String,
				required: [true, 'Postal Code is required.'],
			},
		},
		distancePref: {
			type: Number,
		},
		about: {
			type: String,
		},
		dietType: {
			type: String,
			required: [true, 'Preferred diet required.'],
		},
		favorites: {
			foodTypes: [
				{
					type: String,
				},
			],
			dish: {
				type: String,
			},
		},
		matches: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Profile',
			},
		],
		avatar: {
			type: String,
			default: 'http://localhost:3005/assets/avatars/avatar_26.jpg',
		},
		profilePhoto: {
			type: String,
		},
		images: [
			{
				type: String,
			},
		],
		blocked: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Profile',
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'User is required.'],
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
		timestamps: true,
	}
);

model('Profile', profileSchema);
