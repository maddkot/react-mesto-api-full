const Card = require('../models/cards');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

// gполучение всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

// создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;
  Card.create({ name, link, owner: id })
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new ValidationError('VALIDATION DATA FAIL!');
      }
      next(error);
    });
};

const deleteCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findById(id)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав');
      }
      card.remove()
        .then(() => res.status(200).send({ message: 'Карточка удалена!' }));
    })
    .catch(next);
};

// добавление лайка
const addLike = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Такой карточки с таким id нет'))
    .then((data) => {
      res.send((data));
    })
    .catch(next);
};

// удаление лайка
const deleteLike = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Такой карточки с таким id нет'))
    .then((data) => {
      res.send((data));
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
