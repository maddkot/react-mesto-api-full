const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть и начинается с Bearer
  if (!authorization && !authorization.startsWith('Bearer ')) {
    throw new AuthError('Нужна авторизация');
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new AuthError('Нужна авторизация');
  }
  req.user = payload;

  next();
};
