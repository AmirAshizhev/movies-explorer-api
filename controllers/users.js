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
