const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.get('/protected', verifyToken, (req, res) => {
  res.json({ msg: 'You are authenticated', userId: req.user.id });
});

module.exports = router;
