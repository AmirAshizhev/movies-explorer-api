const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Невалидный адресс электронной почты',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

module.exports.User = mongoose.model('user', userSchema);
