const Card = require('../models/card');

const ERROR_SERVER = 500;
const ERROR_INCORRECT_DATA = 400;
const ERROR_NOT_FOUND = 404;

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
    }

    res.send({ message: err.message });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    const card = await Card.create({ name, link, owner });

    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
    }

    res.status(ERROR_SERVER).send({ message: err.message });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);

    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с данным id не найдена' });
      return;
    }

    res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Передан некорректный id для удаления карточки' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: err.message });
  }
};

module.exports.setLikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с данным id не найдена' });
      return;
    }

    res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные для постановки лайка' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: err.message });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с данным id не найдена' });
      return;
    }

    res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные для удаления лайка' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: err.message });
  }
};
