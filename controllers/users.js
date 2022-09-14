const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { User } = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

exports.getCurrentUser = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(' Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.updateUserInfo = (req, res, next) => {
  const { name } = req.body;
  User.findByIdAndUpdate(req.user._id, { name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(' Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('При регистрации указан email, который уже существует на сервере');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .then((userObj) => res.send({
          data: {
            name: userObj.name,
            email: userObj.email,
          },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные в методы создания пользователя'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пользователь по указанномое email не найден');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-word', { expiresIn: '7d' });
            return res.send({ token });
          }
          throw new UnauthorizedError('Передан неверный логин или пароль');
        });
    })
    .catch(next);
};
