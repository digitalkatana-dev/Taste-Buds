const { Router } = require('express');
const { model, isValidObjectId } = require('mongoose');
const { validateCreateChat } = require('../util/validators');
const requireAuth = require('../middleware/requireAuth');

const Chat = model('Chat');
const Profile = model('Profile');
const Message = model('Message');
const router = Router();

// Create
router.post('/chats', requireAuth, async (req, res) => {
	const { valid, errors } = validateCreateChat(req?.body);

	if (!valid) return res.status(400).json(errors);
	const { users } = req?.body;

	const user = await Profile.findOne({ user: req?.user?._id });

	let recipients = users;
	recipients.push(user?._id);

	try {
		const chatData = {
			users: recipients,
			isGroupChat: recipients?.length > 2 ? true : false,
		};

		const newChat = new Chat(chatData);
		await newChat?.save();

		res.json({ newChat, success: 'Chat created successfully!' });
	} catch (err) {
		console.log(err);
		errors.caht = 'Error creating chat!';
		return res.status(400).json(errors);
	}
});

// Read
router.get('/chats', requireAuth, async (req, res) => {
	let errors = {};
	const hasId = req?.query?.id;
	const unreadOnly = req?.query?.unread;
	const newest = req?.query?.newest;
	let chats;

	try {
		const profile = await Profile.findOne({ user: req?.user?._id });

		if (hasId) {
			const isValid = isValidObjectId(hasId);
			if (!isValid) {
				errors.chat =
					'Error, chat does not exist or you do not have permission to view it.';
				return res.status(404).json(errors);
			}

			chats = await Chat.findOne({
				_id: hasId,
				users: { $elemMatch: { $eq: profile?._id } },
			})
				.populate('users')
				.populate('messages')
				.populate({ path: 'messages', populate: { path: 'sender' } })
				.populate('latestMessage')
				.populate({ path: 'latestMessage', populate: { path: 'sender' } });

			if (!chats) {
				const userFound = await Profile.findById(hasId);
				if (userFound) {
					chats = await Chat.findOneAndUpdate(
						{
							isGroupChat: false,
							users: {
								$size: 2,
								$all: [
									{
										$elemMatch: {
											$eq: profile?._id,
										},
									},
									{
										$elemMatch: { $eq: userFound._id },
									},
								],
							},
						},
						{
							$setOnInsert: {
								users: [profile?._id, userFound._id],
							},
						},
						{
							new: true,
							upsert: true,
						}
					)
						.populate('users')
						.populate('messages')
						.populate({ path: 'messages', populate: { path: 'sender' } })
						.populate('latestMessage')
						.populate({ path: 'latestMessage', populate: { path: 'sender' } });
				}
			}
		} else if (unreadOnly) {
			chats = await Chat.find({ users: { $elemMatch: { $eq: profile?._id } } })
				.populate('users')
				.populate('messages')
				.populate({ path: 'messages', populate: { path: 'sender' } })
				.populate('latestMessage')
				.populate({ path: 'latestMessage', populate: { path: 'sender' } })
				.sort('-updatedAt');

			chats = chats.filter(
				(item) =>
					item.latestMessage &&
					!item.latestMessage?.readBy.includes(profile?._id)
			);
		} else if (newest) {
			chats = await Chat.find({
				users: { $elemMatch: { $eq: profile?._id } },
			})
				.populate('users')
				.populate('messages')
				.populate({ path: 'messages', populate: { path: 'sender' } })
				.populate('latestMessage')
				.populate({ path: 'latestMessage', populate: { path: 'sender' } })
				.sort('-updatedAt');

			const filtered = chats.filter(
				(item) => !item.latestMessage?.readBy.includes(profile?._id)
			);

			chats = filtered[0];
		} else {
			chats = await Chat.find({
				users: { $elemMatch: { $eq: profile?._id } },
			})
				.populate('users')
				.populate('messages')
				.populate({ path: 'messages', populate: { path: 'sender' } })
				.populate('latestMessage')
				.populate({ path: 'latestMessage', populate: { path: 'sender' } })
				.sort('-updatedAt');
		}

		res.json(chats);
	} catch (err) {
		errors.chat = 'Error getting chat list!';
		return res.status(400).json(errors);
	}
});

// Update
router.put('/chats/:id', requireAuth, async (req, res) => {
	let errors = {};
	const { id } = req?.params;

	const updated = await Chat.findByIdAndUpdate(
		id,
		{
			$set: req?.body,
		},
		{
			new: true,
		}
	)
		.populate('users')
		.populate('messages')
		.populate({ path: 'messages', populate: { path: 'sender' } })
		.populate('latestMessage')
		.populate({ path: 'latestMessage', populate: { path: 'sender' } });

	try {
		if (!updated) {
			errors.chat =
				"Error, chat not found or you don't have permission to update it.";
			return res.status(404).json(errors);
		}

		res.json({ updated, success: 'Chat updated successfully!' });
	} catch (err) {
		console.log(err);
		errors.chat = 'Error, unable to update chat.';
		return res.status(400).json(errors);
	}
});

// Delete
router.delete('/chats/:id', requireAuth, async (req, res) => {
	let errors = {};
	const { id } = req?.params;

	const deleted = await Chat.findByIdAndDelete(id);

	try {
		if (!deleted) {
			errors.chat =
				"Error, chat not found or you don't have permission to delete it.";
			return res.status(404).json(errors);
		}

		const chatMessages = await Message.find({ chat: id });

		chatMessages?.forEach(async (message) => {
			await Message.findByIdAndDelete(message._id);
		});

		return res.json({ success: 'Chat deleted successfully!' });
	} catch (err) {
		console.log(err);
		errors.chat = 'Error, unable to delete chat!';
		return res.status(400).json(errors);
	}
});

module.exports = router;
