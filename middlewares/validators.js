const { celebrate, Joi } = require('celebrate');

const regular = /https?:\/\/(www\.)?([0-9A-Za-z-._~:/?#@!$&()*+,;=[\]]{2,265})\.[A-Za-z]{2,6}\b([A-Za-z-._~:/?#@!$&()*+,;=[\]]*)/;

const updateUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().required().pattern(new RegExp(regular)),
    trailerLink: Joi.string().required().pattern(new RegExp(regular)),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(new RegExp(regular)),
    movieId: Joi.string().length(24).hex(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().required(),
  }),
});

module.exports = {
  updateUserInfoValidator,
  createMovieValidator,
  deleteMovieValidator,
  loginValidator,
  createUserValidator,
};
