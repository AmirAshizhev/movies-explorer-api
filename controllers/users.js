const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

exports.getCurrentUser = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => { res.send({ data: user }); })
    .catch(next);
};

exports.updateUserInfo = (req, res, next) => {
  const { name } = req.body;
  User.findByIdAndUpdate(req.user._id, { name }, { new: true, runValidators: true })
    .then((user) => { res.send({ data: user }); })
    .catch(next);
};

exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email })
    .then(() => {
      bcrypt.hash(password, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .then((userObj) => res.send({
          data: {
            name: userObj.name,
            email: userObj.email,
          },
        }))
        .catch((err) => console.log(err));
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('Пользователь по указанномое email не найден');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, 'some-secret-word', { expiresIn: '7d' });
            return res.send({ token });
          }
          throw new Error('Передан неверный логин или пароль');
        });
    })
    .catch(next);
};
