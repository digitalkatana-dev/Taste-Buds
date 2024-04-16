const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('/assets/avatars/:path', async (req, res) => {
	try {
		res.sendFile(path.join(__dirname, `assets/avatars/${req?.params?.path}`));
	} catch (err) {
		console.log(err);
	}
});

router.get('/assets/covers/:path', async (req, res) => {
	try {
		res.sendFile(path.join(__dirname, `assets/covers/${req?.params?.path}`));
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
