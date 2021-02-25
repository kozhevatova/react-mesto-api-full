const Card = require('../models/card');
const BadRequestError = require('../errors/bad-req-err');
const NotFoundError = require('../errors/not-found-err');
const NotAllowedError = require('../errors/not-allowed-err');

const handleError = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new BadRequestError(err.message);
  }
  // return res.status(500).send({ message: err.message });
};

const handleIdNotFound = () => {
  throw new NotFoundError('Нет карточки с таким id');
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      const newCards = cards.sort((newCard, oldCard) => {
        if (newCard.createdAt < oldCard.createdAt) {
          return 1;
        }
        if (newCard.createdAt > oldCard.createdAt) {
          return -1;
        }
        return 0;
      });
      // res.send(cards);
      res.send(newCards);
    })
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => handleIdNotFound())
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NotAllowedError('Нет прав на удаление карточки');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send(deletedCard))
        .catch((err) => handleError(err))
        .catch(next);
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user } }, {
    new: true,
  })
    .orFail(() => handleIdNotFound())
    .then((card) => res.send(card))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, {
    new: true,
  })
    .orFail(() => handleIdNotFound())
    .then((card) => res.send(card))
    .catch((err) => handleError(err))
    .catch(next);
};
