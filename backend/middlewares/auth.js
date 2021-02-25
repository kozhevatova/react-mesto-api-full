const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-auth-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // авторизационный заголовок
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');

  // верификация токена
  let payload;
  try {
    payload = jwt.verify(token,
      '458fdd9a582f800b69253066e06b58229d2361b70d5b1e61f59fcf6a03066089');
  } catch (err) {
    throw new NotAuthorizedError(err.message);
  }

  // запись пейлоуда в объект запроса
  req.user = payload;
  next();
};
