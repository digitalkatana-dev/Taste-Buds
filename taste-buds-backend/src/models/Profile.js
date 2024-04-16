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
		profilePic: {
			type: String,
			default: 'http://localhost:3005/assets/avatars/avatar_26.jpg',
		},
		coverPhoto: {
			type: String,
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
		distancePreference: {
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
