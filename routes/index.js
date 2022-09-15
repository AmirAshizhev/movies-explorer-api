const express = require('express');
// const usersRouter = require('./users');
// const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../middlewares/validators');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

const router = express.Router();

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

module.exports = router;
