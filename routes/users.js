const express = require('express');
const { getUsers, getCurrentUser, updateUserInfo } = require('../controllers/users');
const { updateUserInfoValidator } = require('../middlewares/validators');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', updateUserInfoValidator, updateUserInfo);

module.exports = router;
