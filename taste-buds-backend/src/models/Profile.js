const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
	{
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
			day: {
				type: Number,
				required: [true, 'DOB is required'],
			},
			month: {
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
		buds: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		avatar: {
			type: String,
			default: 'http://localhost:3005/assets/avatars/avatar_26.jpg',
		},
		imageUrl1: {
			type: String,
		},
		imageUrl2: {
			type: String,
		},
		imageUrl3: {
			type: String,
		},
		profilePhoto: {
			type: String,
		},
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
