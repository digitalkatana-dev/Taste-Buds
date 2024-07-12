const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'Profile',
			required: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
		},
		chat: {
			type: Schema.Types.ObjectId,
			ref: 'Chat',
		},
		readBy: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Profile',
			},
		],
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
