const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotAuthorizedError = require('../errors/not-auth-err');
const BadRequestError = require('../errors/bad-req-err');
const NotFoundError = require('../errors/not-found-err');

const handleError = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new BadRequestError(err.message);
  }
};

const handleIdNotFound = () => {
  throw new NotFoundError('Нет пользователя с таким id');
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  // if (req.params.userId !== 'me') {
  User.findById(req.params.userId)
    .orFail(() => handleIdNotFound())
    .then((user) => res.send(user))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(({ _id }) => User.findById(_id))
    .then((user) => res.send(user))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => handleIdNotFound())
    .then((user) => res.send(user))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => handleIdNotFound())
    .then((user) => res.send(user))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => handleIdNotFound())
    .then((user) => res.send(user))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создание токена
      const { NODE_ENV, JWT_SECRET } = process.env;
      // console.log('jwt secret', JWT_SECRET);
      const token = jwt.sign({ _id: user._id },
        // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        NODE_ENV === 'production' ? '458fdd9a582f800b69253066e06b58229d2361b70d5b1e61f59fcf6a03066089' : 'dev-secret',
        // '458fdd9a582f800b69253066e06b58229d2361b70d5b1e61f59fcf6a03066089',
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      throw new NotAuthorizedError(err.message);
    })
    .catch(next);
};
