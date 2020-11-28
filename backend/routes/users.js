const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getOneUser, editAvatar, updateProfile, getUserById,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getOneUser);

router.get('/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(20).min(2),
    about: Joi.string().required().max(20).min(2),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/),
  }),
}), editAvatar);

module.exports = router;
