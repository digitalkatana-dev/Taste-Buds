const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'Profile',
			required: true,
		},
		recipient: {
			type: Schema.Types.ObjectId,
			ref: 'Profile',
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		chat: {
			type: Schema.Types.ObjectId,
			ref: 'Chat',
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

model('Message', messageSchema);
