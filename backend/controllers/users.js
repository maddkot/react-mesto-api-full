const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

// получение всех юзеров
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};
// получение информации об одном юзере
const getOneUser = (req, res, next) => {
  // User.findById(req.user._id)
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } return res.status(200).send(user);
    })
    .catch((error) => {
      // console.log(JSON.stringify(error));
      if (error.kind === 'ObjectId') {
        throw new ValidationError('Нет корректного id');
      }
      next(error);
    });
};

// создание пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(200).send({ message: `Пользователь ${user} создан` });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Введены некорректные данные');
      }
      if (err.code === 11000 && err.name === 'MongoError') {
        throw new ConflictError('Данный email уже зарегистрирован');
      }
      throw err;
    })
    .catch(next);
};

// логин пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

/* const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res
      .status(200)
      .send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      }))
    .catch((err) => {
      throw err;
    })
    .catch(next);
}; */

// обновление аватара
const editAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true })
    .then((userAvatar) => {
      res.status(200).send({ userAvatar });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationError('Введены некорректные денные');
      }
      throw error;
    })
    .catch(next);
};

// обновление данных пользователя
const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationError('Введены некорректные денные');
      }
      throw error;
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  login,
  // getProfile,
  editAvatar,
  updateProfile,
};
