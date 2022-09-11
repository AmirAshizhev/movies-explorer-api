const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('необходма авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-word');
  } catch (err) {
    throw new Error('необходма авторизация');
  }

  req.user = payload;

  next();
};
