const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
	{
		from: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		to: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		message: {
			type: String,
			required: true,
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
