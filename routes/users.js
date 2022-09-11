const express = require('express');
const { getUsers, getCurrentUser, updateUserInfo } = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', updateUserInfo);

module.exports = router;
