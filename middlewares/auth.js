const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('необходма авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-word');
  } catch (err) {
    throw new UnauthorizedError('необходма авторизация');
  }

  req.user = payload;

  next();
};
