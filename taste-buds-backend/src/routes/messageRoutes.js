const { Router } = require('express');
const { model } = require('mongoose');
const { validateMessage } = require('../util/validators');
const requireAuth = require('../middleware/requireAuth');
const Message = model('Message');
const Chat = model('Chat');
const Profile = model('Profile');
const Notification = model('Notification');
const router = Router();

// Create
router.post('/messages', requireAuth, async (req, res) => {
	const { valid, errors } = validateMessage(req?.body);

	if (!valid) return res.status(400).json(errors);

	const activeUser = await Profile.findOne({ user: req?.user?._id }).populate(
		'matches'
	);
	const { chatId, content } = req?.body;

	try {
		const messageData = {
			sender: activeUser?._id,
			content,
			chat: chatId,
		};

		const rawMessage = new Message(messageData);
		await rawMessage?.save();

		const updatedChat = await Chat.findByIdAndUpdate(chatId, {
			latestMessage: rawMessage,
		});
		const chatUsers = updatedChat?.users;

		const newMessage = await Message.findById(rawMessage?._id)
			.populate('sender')
			.populate('chat');

		chatUsers.forEach(async (user) => {
			if (user == newMessage.sender._id.toString()) return;

			await Notification.insertNotification(
				user.toString(),
				newMessage.sender._id.toString(),
				'newMessage',
				newMessage.chat._id.toString()
			);
		});

		res.status(201).json({
			newMessage,
			success: 'Message sent!',
		});
	} catch (err) {
		errors.message = 'Error sending message!';
		return res.status(400).json(errors);
	}
});

// Mark all read
router.put('/messages/:chatId/mark-read', requireAuth, async (req, res) => {
	let errors = {};

	const { chatId } = req?.params;
	const activeUser = await Profile.findOne({ user: req?.user?._id });

	try {
		await Message.updateMany(
			{ chat: chatId },
			{ $addToSet: { readBy: activeUser?._id } }
		);

		res.json({ success: 'Messages marked as read successfully' });
	} catch (err) {
		errors.message = 'Error marking all messages as read!';
		return res.status(400).json(errors);
	}
});

module.exports = router;
