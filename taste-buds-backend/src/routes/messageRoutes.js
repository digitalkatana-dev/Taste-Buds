const { Router } = require('express');
const { model } = require('mongoose');
const { validateMessage } = require('../util/validators');
const requireAuth = require('../middleware/requireAuth');
const Message = model('Message');
const router = Router();

// Create
router.post('/messages', requireAuth, async (req, res) => {
	const { valid, errors } = validateMessage(req?.body);

	if (!valid) return res.status(400).json(errors);

	try {
		const newMessage = new Message(req?.body);
		await newMessage?.save();

		res.status(201).json({ success: 'Message sent!' });
	} catch (err) {
		errors.message = 'Error sending message!';
		return res.status(400).json(errors);
	}
});

module.exports = router;
