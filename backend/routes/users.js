const { celebrate, Joi } = require('celebrate');
const routerUsers = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getUserInfo);
routerUsers.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), getUserById);

routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().min(2).max(200),
  }),
}), updateProfile);

routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(https?):\/\/(www\.)?([\w/?.#-]+\.?)+\.[^\s]{2,}$/),
  }),
}), updateAvatar);

module.exports = routerUsers;
